'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Tooltip,
} from '@mui/material'

import ImageUploadDropzone from '../Inputs/ImageUploadDropzone'
import api from '../../libs/api'
import CaptionCard from '../Card/Caption'

export type LanguageOption = {
  label: string
  code: 'fa' | 'en'
}

export type FormValues = {
  image: File | null
  tone: string
  language: LanguageOption | null
  context: string
  model: 'gpt4o' | 'gemini_pro' | 'blip' | 'llama'
}

const languageOptions: LanguageOption[] = [
  { label: 'Persian', code: 'fa' },
  { label: 'English', code: 'en' },
]

type ToneOption = { label: string; value: string }

const toneOptions: ToneOption[] = [
  { label: 'معمولی', value: 'Normal' },
  { label: 'محاوره‌ای', value: 'Casual' },
  { label: 'رسمی', value: 'Professional' },
  { label: 'شوخ و دوستانه', value: 'Playful' },
  { label: 'دوستانه', value: 'Friendly' },
  { label: 'طنزآمیز', value: 'Funny' },
  { label: 'بازاریابی', value: 'Marketing' },
  { label: 'فنی', value: 'Technical' },
  { label: 'روایت‌محور', value: 'Storytelling' },
  { label: 'الهام‌بخش', value: 'Inspirational' },
]

export default function ImageCaptionForm() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const { handleSubmit, control, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      image: null,
      tone: toneOptions[0].value,
      language: languageOptions[1],
      context: '',
      model: 'gpt4o',
    },
  })

  const model = watch('model')
  const isBlip = model === 'blip'

  useEffect(() => {
    if (isBlip) {
      const en = languageOptions.find((l) => l.code === 'en') || null
      setValue('language', en, { shouldValidate: true, shouldDirty: true })
    }
  }, [isBlip, setValue])

  const onSubmit = async (values: FormValues) => {
    if (!values.image) return

    setLoading(true)
    setError(null)
    setResponse([])

    try {
      const formData = new FormData()
      formData.append('file', values.image)
      formData.append('tone', values.tone)
      formData.append('language', values.language?.code || 'en')
      formData.append('context', values.context)
      formData.append('model_name', values.model)

      const result = await api.post('/api/v1/caption', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (result.data && Array.isArray(result.data.captions)) {
        setResponse(result.data.captions)
      } else {
        setError('پاسخ نامعتبر از سرور دریافت شد')
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'خطا در تولید کپشن')
    } finally {
      setLoading(false)
    }
  }
console.log(response);

  return (
    <Stack spacing={4} bgcolor="transparent">
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            تولیدکننده کپشن تصویر
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            تولید کپشن برای تصاویر با استفاده از هوش مصنوعی
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
            <Controller
              name="image"
              control={control}
              rules={{ required: 'لطفاً یک تصویر بارگذاری کنید' }}
              render={({ field, fieldState }) => (
              <Box>
                <ImageUploadDropzone
                  key={field.value ? field.value.name : 'empty'}
                  value={field.value}
                  onChange={(file) => field.onChange(file)}
                />
                  {fieldState.error && (
                    <Typography color="error" variant="caption">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </Box>
              )}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <Controller
                name="tone"
                control={control}
                render={({ field }) => (
                <TextField select fullWidth label="انتخاب لحن" disabled={isBlip} {...field}>
                    {toneOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth disabled={isBlip}>
                    <InputLabel id="language-label">انتخاب زبان</InputLabel>
                    <Select
                      labelId="language-label"
                      label="انتخاب زبان"
                      value={field.value?.code ?? ''}
                      onChange={(e) => {
                        const selected = languageOptions.find((opt) => opt.code === e.target.value)
                        field.onChange(selected ?? null)
                      }}
                      disabled={isBlip}
                    >
                      {languageOptions.map((opt) => (
                        <MenuItem key={opt.code} value={opt.code}>
                          {opt.code === 'fa' ? 'فارسی' : 'انگلیسی'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <TextField select fullWidth label="مدل" {...field}>
                  <MenuItem value="gpt4o">gpt</MenuItem>
                  <MenuItem value="gemini_pro">gemini</MenuItem>
                  <MenuItem value="blip">blip</MenuItem>
                  <MenuItem value="llama">llama</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="context"
              control={control}
              render={({ field }) => (
                <TextField
                  label="توضیحات اضافی"
                  placeholder="مثال: این عکس از نمای بیرونی موزه مت نیویورک است"
                  fullWidth
                  multiline
                  minRows={3}
                  disabled={isBlip}
                  {...field}
                />
              )}
            />

            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'در حال تولید...' : 'تولید کپشن'}
              </Button>
              <Button type="button" variant="outlined" onClick={() => reset()}>
                بازنشانی
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Paper elevation={2} sx={{ mt:4, p: 3, height: 'fit-content', minWidth: { md: 300 } }}>
        <Typography variant="h6" gutterBottom>
          کپشن‌های تولیدشده
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        )}

        {response.length > 0 && (
          <Stack spacing={2}>
            {response.map((caption, index) => (
              <CaptionCard key={index} text={caption} />
            ))}
          </Stack>
        )}
        {!loading && !error && response.length === 0 && (
          <Typography color="text.secondary" align="center">
              هنوز کپشنی تولید نشده است. یک تصویر بارگذاری کنید و روی «تولید کپشن» بزنید.
          </Typography>
        )}
      </Paper>
    </Stack>
  )
}


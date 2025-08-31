'use client'

import React, { useEffect } from 'react'
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
  CircularProgress,
  Stack,
} from '@mui/material'

import ImageUploadDropzone from '../Inputs/ImageUploadDropzone'
import { IImagePrompt, LanguageOption } from '@/types/entity'

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

interface ImageCaptionFormProps {
  onSubmit: (values: IImagePrompt) => Promise<void>
  loading?: boolean
  description?: string
  submitButtonText?: string;
  showExtraInput?: boolean
}

export default function ImageCaptionForm({
  onSubmit,
  loading = false,
  description = 'تولید کپشن برای تصاویر با استفاده از هوش مصنوعی',
  submitButtonText = 'تولید کپشن',
  showExtraInput = true,
}: ImageCaptionFormProps) {
  const { handleSubmit, control, reset, setValue, watch } = useForm<IImagePrompt>({
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

  const handleFormSubmit = async (values: IImagePrompt) => {
    if (!values.image) return
    await onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ flex: 1 }}>
      <Typography variant="subtitle1" component="p" color="text.secondary" gutterBottom sx={{ mb: 2.5 }}>
        {description}
      </Typography>
      <Stack direction='row' spacing={2}>
        <Controller
          name="image"
          control={control}
          rules={{ required: 'لطفاً یک تصویر بارگذاری کنید' }}
          render={({ field, fieldState }) => (
            <Box sx={{ flex: '1 1 0' }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: !showExtraInput ? 5.5 : 2, mt: 3, flex: '1 1 0' }}>
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
          {showExtraInput &&
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
          }

          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'در حال تولید...' : submitButtonText}
            </Button>
            <Button type="button" variant="outlined" onClick={() => reset()}>
              بازنشانی
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}


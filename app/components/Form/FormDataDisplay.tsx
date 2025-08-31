'use client'

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
} from '@mui/material'
import { IImagePrompt } from '@/types/entity'
import { ArrowBack } from '@mui/icons-material'

interface FormDataDisplayProps {
  formData: IImagePrompt
  onBackToForm: () => void
}

export default function FormDataDisplay({ formData, onBackToForm }: FormDataDisplayProps) {
  const getLanguageLabel = (code: string) => {
    return code === 'fa' ? 'فارسی' : 'انگلیسی'
  }

  const getToneLabel = (value: string) => {
    const toneOptions = [
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
    return toneOptions.find(opt => opt.value === value)?.label || value
  }

  const getModelLabel = (model: string) => {
    const modelLabels: Record<string, string> = {
      'gpt4o': 'GPT-4',
      'gemini_pro': 'Gemini Pro',
      'blip': 'BLIP',
      'llama': 'Llama'
    }
    return modelLabels[model] || model
  }

  return (
    <Card sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Box sx={{ flex: '0 0 200px' }}>
            {formData.image && (
              <Box
                component="img"
                src={URL.createObjectURL(formData.image)}
                alt="Uploaded image"
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>

          {/* Form Details Section */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <Typography variant="h6" component="h2" gutterBottom>
                جزئیات درخواست
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                {/* Left Column */}
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      نام فایل:
                    </Typography>
                    <Typography variant="body1">
                      {formData.image?.name || 'تصویر انتخاب نشده'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      لحن:
                    </Typography>
                    <Typography variant="body1">
                      {getToneLabel(formData.tone)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      زبان:
                    </Typography>
                    <Typography variant="body1">
                      {getLanguageLabel(formData.language?.code || 'en')}
                    </Typography>
                  </Box>
                </Stack>

                {/* Right Column */}
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      مدل:
                    </Typography>
                    <Typography variant="body1">
                      {getModelLabel(formData.model)}
                    </Typography>
                  </Box>

                  {formData.context && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        توضیحات اضافی:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        backgroundColor: 'action.hover', 
                        p: 1, 
                        borderRadius: 1,
                        fontStyle: 'italic'
                      }}>
                        {formData.context}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>

              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={onBackToForm}
                sx={{ alignSelf: 'flex-end', mt: 2 }}
              >
                بازگشت به فرم
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

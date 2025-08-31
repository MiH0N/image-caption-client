'use client'

import React from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from './ImageCaptionForm'
import FormDataDisplay from './FormDataDisplay'
import { IImagePrompt } from '@/types/entity'

interface FormWrapperProps {
  showForm: boolean
  formData: IImagePrompt | null
  onSubmit: (values: IImagePrompt) => Promise<void>
  onBackToForm: () => void
  loading: boolean
  description: string
  submitButtonText: string
  showExtraInput?: boolean
}

export default function FormWrapper({
  showForm,
  formData,
  onSubmit,
  onBackToForm,
  loading,
  description,
  submitButtonText,
  showExtraInput = true
}: FormWrapperProps) {
  if (showForm) {
    return (
      <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ImageCaptionForm
          onSubmit={onSubmit}
          loading={loading}
          description={description}
          submitButtonText={submitButtonText}
          showExtraInput={showExtraInput}
        />
      </Stack>
    )
  }

  return (
    formData && (
      <FormDataDisplay 
        formData={formData} 
        onBackToForm={onBackToForm} 
      />
    )
  )
}

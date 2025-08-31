'use client'

import React, { useState } from 'react'
import { Box, Stack } from '@mui/material'
import { useApiCall } from '../hooks/useApiCall'
import LoadingWrapper from '../components/LoadingWrapper'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import FormDataDisplay from '../components/Form/FormDataDisplay'
import ResultsDisplay from '../components/Results/ResultsDisplay'
import { IImagePrompt } from '@/types/entity'

export default function CaptionPage() {
  const [formData, setFormData] = useState<IImagePrompt | null>(null)
  const [showForm, setShowForm] = useState(true)
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/caption',
    responseKey: 'captions',
    errorMessage: 'خطا در تولید کپشن',
  })

  const handleFormSubmit = async (values: IImagePrompt) => {
    // Store form data and hide form
    setFormData(values)
    setShowForm(false)
    
    // Submit the form data
    await handleSubmit(values)
  }

  const handleBackToForm = () => {
    setShowForm(true)
    setFormData(null)
  }

  return (
    <LoadingWrapper isLoading={loading}>
      <Stack spacing={4} bgcolor="transparent">
        {showForm ? (
          <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <ImageCaptionForm
              onSubmit={handleFormSubmit}
              loading={loading}
              description="تولید کپشن برای تصاویر با استفاده از هوش مصنوعی"
              submitButtonText="تولید کپشن"
            />
          </Stack>
        ) : (
          formData && (
            <FormDataDisplay 
              formData={formData} 
              onBackToForm={handleBackToForm} 
            />
          )
        )}

        <ResultsDisplay
          loading={loading}
          error={error}
          response={response}
          title="کپشن‌های تولیدشده"
          emptyMessage="هنوز کپشنی تولید نشده است. یک تصویر بارگذاری کنید و روی «تولید کپشن» بزنید."
        />
      </Stack >
    </LoadingWrapper>
  )
}

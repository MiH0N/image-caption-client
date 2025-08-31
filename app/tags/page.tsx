'use client'

import React, { useState } from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import FormDataDisplay from '../components/Form/FormDataDisplay'
import { useApiCall } from '../hooks/useApiCall'
import TagsResultsDisplay from '../components/Results/Tags'
import LoadingWrapper from '../components/LoadingWrapper'
import { IImagePrompt } from '@/types/entity'

export default function TagsPage() {
  const [formData, setFormData] = useState<IImagePrompt | null>(null)
  const [showForm, setShowForm] = useState(true)
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/hashtags',
    responseKey: 'hashtags',
    errorMessage: 'خطا در تولید هشتگ',
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
              description="تولید تگ برای تصاویر با استفاده از هوش مصنوعی"
              submitButtonText="تولید هشتگ"
              showExtraInput={false}
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

        <TagsResultsDisplay
          loading={loading}
          error={error}
          response={response}
          title="هشتگ‌های تولیدشده"
          emptyMessage="هنوز هشتگی تولید نشده است. یک تصویر بارگذاری کنید و روی «تولید هشتگ» بزنید."
        />
      </Stack>
    </LoadingWrapper>
  )
}


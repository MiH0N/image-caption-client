'use client'

import React, { useState } from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import FormDataDisplay from '../components/Form/FormDataDisplay'
import { useApiCall } from '../hooks/useApiCall'
import ElementResultsDisplay from '../components/Results/Elements'
import LoadingWrapper from '../components/LoadingWrapper'
import { IImagePrompt } from '@/types/entity'

export default function ElementsPage() {
  const [formData, setFormData] = useState<IImagePrompt | null>(null)
  const [showForm, setShowForm] = useState(true)
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/elements',
    responseKey: 'elements',
    errorMessage: 'خطا در پردازش تصویر',
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
              description="تشخیص و توصیف پردازش اشیاء موجود در تصویر با استفاده از هوش مصنوعی"
              submitButtonText="پردازش تصویر"
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

        <ElementResultsDisplay
          loading={loading}
          error={error}
          response={response}
          title="اشیاء تشخیص داده شده"
          emptyMessage="هنوز عنصری تشخیص داده نشده است. یک تصویر بارگذاری کنید و روی «پردازش تصویر» بزنید."
        />
      </Stack>
    </LoadingWrapper>
  )
}

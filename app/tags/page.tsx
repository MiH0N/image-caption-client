'use client'

import React from 'react'
import { Stack } from '@mui/material'
import FormWrapper from '../components/Form/FormWrapper'
import { useApiCall } from '../hooks/useApiCall'
import { useFormState } from '../hooks/useFormState'
import TagsResultsDisplay from '../components/Results/Tags'
import LoadingWrapper from '../components/LoadingWrapper'

export default function TagsPage() {
  const { formData, showForm, handleFormSubmit, handleBackToForm } = useFormState()
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/hashtags',
    responseKey: 'hashtags',
    errorMessage: 'خطا در تولید هشتگ',
  })

  const onSubmit = (values: any) => handleFormSubmit(values, handleSubmit)

  return (
    <LoadingWrapper isLoading={loading}>
      <Stack spacing={4} bgcolor="transparent">
        <FormWrapper
          showForm={showForm}
          formData={formData}
          onSubmit={onSubmit}
          onBackToForm={handleBackToForm}
          loading={loading}
          description="تولید تگ برای تصاویر با استفاده از هوش مصنوعی"
          submitButtonText="تولید هشتگ"
          showExtraInput={false}
        />

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


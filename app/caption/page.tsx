'use client'

import React from 'react'
import { Stack } from '@mui/material'
import { useApiCall } from '../hooks/useApiCall'
import LoadingWrapper from '../components/LoadingWrapper'
import FormWrapper from '../components/Form/FormWrapper'
import { useFormState } from '../hooks/useFormState'
import ResultsDisplay from '../components/Results/ResultsDisplay'

export default function CaptionPage() {
  const { formData, showForm, handleFormSubmit, handleBackToForm } = useFormState()
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/caption',
    responseKey: 'captions',
    errorMessage: 'خطا در تولید کپشن',
  })

  const onSubmit = (values: any) => handleFormSubmit(values, handleSubmit)

  return (
    <LoadingWrapper isLoading={loading}>
      <Stack spacing={1} bgcolor="transparent">
        <FormWrapper
          showForm={showForm}
          formData={formData}
          onSubmit={onSubmit}
          onBackToForm={handleBackToForm}
          loading={loading}
          description="تولید کپشن برای تصاویر با استفاده از هوش مصنوعی"
          submitButtonText="تولید کپشن"
          showExtraInput={true}
        />

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

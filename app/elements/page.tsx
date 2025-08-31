'use client'

import React from 'react'
import { Stack } from '@mui/material'
import FormWrapper from '../components/Form/FormWrapper'
import { useApiCall } from '../hooks/useApiCall'
import { useFormState } from '../hooks/useFormState'
import ElementResultsDisplay from '../components/Results/Elements'
import LoadingWrapper from '../components/LoadingWrapper'

export default function ElementsPage() {
  const { formData, showForm, handleFormSubmit, handleBackToForm } = useFormState()
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/elements',
    responseKey: 'elements',
    errorMessage: 'خطا در پردازش تصویر',
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
          description="تشخیص و توصیف پردازش اشیاء موجود در تصویر با استفاده از هوش مصنوعی"
          submitButtonText="پردازش تصویر"
          showExtraInput={false}
        />

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

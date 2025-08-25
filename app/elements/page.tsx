'use client'

import React from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import ResultsDisplay from '../components/Results/ResultsDisplay'
import { useApiCall } from '../hooks/useApiCall'

export default function ElementsPage() {
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/elements',
    responseKey: 'elements',
    errorMessage: 'خطا در پردازش تصویر',
  })

  return (
    <Stack spacing={4} bgcolor="transparent">
      <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ImageCaptionForm
          onSubmit={handleSubmit}
          loading={loading}
          title="تشخیص پردازش اشیاء"
          description="تشخیص و توصیف پردازش اشیاء موجود در تصویر با استفاده از هوش مصنوعی"
          submitButtonText="پردازش تصویر"
        />
      </Stack>
      
      <ResultsDisplay
        loading={loading}
        error={error}
        response={response}
        title="اشیاء تشخیص داده شده"
        emptyMessage="هنوز عنصری تشخیص داده نشده است. یک تصویر بارگذاری کنید و روی «پردازش تصویر» بزنید."
      />
    </Stack>
  )
}

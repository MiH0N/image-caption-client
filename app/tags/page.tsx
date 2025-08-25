'use client'

import React from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import ResultsDisplay from '../components/Results/ResultsDisplay'
import { useApiCall } from '../hooks/useApiCall'

export default function TagsPage() {
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/hashtags',
    responseKey: 'hashtags',
    errorMessage: 'خطا در تولید هشتگ',
  })

  return (
    <Stack spacing={4} bgcolor="transparent">
      <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ImageCaptionForm
          onSubmit={handleSubmit}
          loading={loading}
          description="تولید هشتگ برای تصاویر با استفاده از هوش مصنوعی"
          submitButtonText="تولید هشتگ"
          showExtraInput={false}
        />
      </Stack>

      <ResultsDisplay
        loading={loading}
        error={error}
        response={response}
        title="هشتگ‌های تولیدشده"
        emptyMessage="هنوز هشتگی تولید نشده است. یک تصویر بارگذاری کنید و روی «تولید هشتگ» بزنید."
      />
    </Stack>
  )
}

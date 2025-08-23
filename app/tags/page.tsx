'use client'

import React from 'react'
import { Container, Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import ResultsDisplay from '../components/Results/ResultsDisplay'
import { useApiCall } from '../hooks/useApiCall'

export default function HashtagsPage() {
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/hashtags',
    responseKey: 'hashtags',
    errorMessage: 'خطا در تگ‌گذاری',
  })

  return (
    <Container maxWidth="md" sx={{ py: 8, backgroundColor: 'transparent' }}>
      <Stack spacing={4} bgcolor="transparent">
        <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <ImageCaptionForm
            onSubmit={handleSubmit}
            loading={loading}
            title="تولیدکننده تگ‌گذاری تصویر"
            description="تگ‌گذاری برای تصاویر با استفاده از هوش مصنوعی"
            submitButtonText="تگ‌گذاری"
          />
        </Stack>
        
        <ResultsDisplay
          loading={loading}
          error={error}
          response={response}
          title="تگ‌گذاری‌های تولیدشده"
          emptyMessage="هنوز تگ‌گذاریی تولید نشده است. یک تصویر بارگذاری کنید و روی «تگ‌گذاری» بزنید."
        />
      </Stack>
    </Container>
  )
}

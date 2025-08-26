'use client'

import React from 'react'
import { Stack } from '@mui/material'
import ImageCaptionForm from '../components/Form/ImageCaptionForm'
import ResultsDisplay from '../components/Results/ResultsDisplay'
import { useApiCall } from '../hooks/useApiCall'

export default function CaptionPage() {
  const { loading, response, error, handleSubmit } = useApiCall({
    endpoint: '/api/v1/caption',
    responseKey: 'captions',
    errorMessage: 'خطا در تولید کپشن',
  })

  return (
    <Stack spacing={4} bgcolor="transparent">
      <Stack sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ImageCaptionForm
          onSubmit={handleSubmit}
          loading={loading}
          description="تولید کپشن برای تصاویر با استفاده از هوش مصنوعی"
          submitButtonText="تولید کپشن"
        />
      </Stack>

      <ResultsDisplay
        loading={loading}
        error={error}
        // response={[
        //   "This hand-drawn chart illustrates a gradual upward trend marked with several labeled points",
        //   "The graph depicts progress over time, with key moments highlighted along the rising curve",
        //   "A visual representation of data progress, combining handwritten annotations with scattered datapoints",
        //   "This diagram showcases a steady climbing line, suggesting consistent growth or improvement",
        //   "Marked with letters, the graph portrays milestones along a path of continuous development"
        // ]}
        response={response}
        title="کپشن‌های تولیدشده"
        emptyMessage="هنوز کپشنی تولید نشده است. یک تصویر بارگذاری کنید و روی «تولید کپشن» بزنید."
      />
    </Stack>
  )
}

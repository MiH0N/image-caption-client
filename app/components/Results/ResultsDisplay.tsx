'use client'

import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Card,
} from '@mui/material'
import TypewriterCaptionCard from '../Card/TypewriterCaption'

interface ResultsDisplayProps {
  loading: boolean
  error: string | null
  response: string[]
  title?: string
  emptyMessage?: string
}

export default function ResultsDisplay({
  loading,
  error,
  response,
  title = 'نتایج تولیدشده',
  emptyMessage = 'هنوز نتیجه‌ای تولید نشده است. یک تصویر بارگذاری کنید و روی دکمه مربوطه بزنید.',
}: ResultsDisplayProps) {
  return (
    <Card sx={{ p: 3, pt:0, height: 'fit-content', minWidth: { md: 300 } }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      )}

      {response.length > 0 && (
        <Stack spacing={2} mt={2}>
          {response.map((item, index) => (
            <TypewriterCaptionCard
              key={index}
              text={item}
              delay={30}
              startDelay={index * 500}
            />
          ))}
        </Stack>
      )}

      {!loading && !error && response.length === 0 && (
        <Typography color="text.secondary" align="center">
          {emptyMessage}
        </Typography>
      )}
    </Card>
  )
}

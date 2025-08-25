'use client'

import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material'
import CaptionCard from '../Card/Caption'

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
    <Paper elevation={2} sx={{ mt: 4, p: 3, height: 'fit-content', minWidth: { md: 300 } }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

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
        <Stack spacing={2}>
          {response.map((item, index) => (
            <CaptionCard key={index} text={item} />
          ))}
        </Stack>
      )}
      
      {!loading && !error && response.length === 0 && (
        <Typography color="text.secondary" align="center">
          {emptyMessage}
        </Typography>
      )}
    </Paper>
  )
}

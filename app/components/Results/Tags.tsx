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
import ChipsTag from '../Chip/Tags'

interface TagsResultsDisplayProps {
  loading: boolean
  error: string | null
  response: string[]
  title?: string
  emptyMessage?: string
}

export default function TagsResultsDisplay({
  loading,
  error,
  response,
  title = 'نتایج تولیدشده',
  emptyMessage = 'هنوز نتیجه‌ای تولید نشده است. یک تصویر بارگذاری کنید و روی دکمه مربوطه بزنید.',
}: TagsResultsDisplayProps) {

  return (
    <Box sx={{ mt: 4, height: 'fit-content', minWidth: { md: 300 } }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      )}

      {response.length > 0 && (
        <Stack gap={1.5} direction={'row'} overflow={'hidden'} flexWrap={'wrap'}>
          {response.map((item, index) => (
            <ChipsTag key={index} text={item} />
          ))}
        </Stack>
      )}

      {!loading && !error && response.length === 0 && (
        <Typography color="text.secondary" align="center">
          {emptyMessage}
        </Typography>
      )}
    </Box>
  )
}

'use client'

import React from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Avatar,
  Chip,
  Grow,
} from '@mui/material'

interface ElementResultsDisplayProps {
  loading: boolean
  error: string | null
  response: string[]
  title?: string
  emptyMessage?: string
}

export default function ElementResultsDisplay({
  loading,
  error,
  response,
  title = 'نتایج تولیدشده',
  emptyMessage = 'هنوز نتیجه‌ای تولید نشده است. یک تصویر بارگذاری کنید و روی دکمه مربوطه بزنید.',
}: ElementResultsDisplayProps) {

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
            <Grow
              key={index}
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={index * 800}
            >
              <div>
                <Chip label={item} variant="outlined" />
              </div>
            </Grow>
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

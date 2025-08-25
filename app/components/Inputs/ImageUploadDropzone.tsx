'use client'

import { Box, Typography, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import React from 'react'

export type ImageUploadDropzoneProps = {
  value?: File | null
  onChange: (file: File | null) => void
}

const DropArea = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
}))

export default function ImageUploadDropzone({ value, onChange }: ImageUploadDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const resetInputElement = () => {
    if (inputRef.current) inputRef.current.value = ''
  }

  const openFileDialog = () => {
    resetInputElement()
    inputRef.current?.click()
  }

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0] ?? null
    if (file) {
      onChange(file)
    } else {
      onChange(null)
    }
  }

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {!value ? (
        <DropArea
          role="button"
          onClick={openFileDialog}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CloudUploadIcon fontSize="large" />
            <Typography variant="body1">
              برای آپلود تصویر، روی اینجا کلیک کنید
            </Typography>
            <Typography variant="caption">PNG, JPG, GIF, HEIC</Typography>
          </Box>
        </DropArea>
      ) : (
        <Box mt={1}>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{ maxWidth: '100%', maxHeight: 300, borderRadius: 1, display: 'block' }}
            />
          )}
          <Box display="flex" gap={1} mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                resetInputElement()
                onChange(null)
              }}
            >
              حذف
            </Button>
            <Button variant="contained" onClick={openFileDialog}>
              تغییر
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}



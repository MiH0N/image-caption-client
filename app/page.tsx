'use client'

import { Container, Paper } from '@mui/material'
import ImageCaptionForm from './components/Form/ImageCaptionForm'

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8, backgroundColor: 'transparent' }}>
      <ImageCaptionForm />
    </Container>
  )
}

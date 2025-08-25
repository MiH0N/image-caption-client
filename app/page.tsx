'use client'

import React from 'react'
import { Box, Typography, Stack, IconButton, Divider } from '@mui/material'
import { useRouter } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home';
import FeatureCard from './components/Card/FeatureCard'

interface FeatureCardData {
  id: string
  title: string
  description: string
  image: string
  path: string
  color: string
  bg: string
}

const featureCards: FeatureCardData[] = [
  {
    id: 'caption',
    title: 'توصیف تصویر',
    description: 'ابزار ما محتوای هر تصویر را تحلیل می‌کند و توضیحی روان و قابل فهم از آن ارائه می‌دهد. مناسب برای دسترس‌پذیری، تولید محتوا و مستندسازی.',
    image: '/images/caption.png',
    path: '/caption',
    color: '#D9333E',
    bg: '#FFEBEC',
  },
  {
    id: 'tags',
    title: 'تگ‌گذاری',
    description: 'این ابزار اجزای اصلی تصویر را شناسایی کرده و برچسب‌های مرتبط تولید می‌کند. به شما کمک می‌کند تصاویرتان سریع‌تر دسته‌بندی و جستجو شوند.',
    image: '/images/tags.png',
    path: '/tags',
    color: '#8E25F6',
    bg: '#F3E9FD',
  },
  {
    id: 'elements',
    title: 'پردازش تصویر',
    description: 'این ابزار اجزای موجود در هر تصویر را شناسایی کرده و به‌صورت یک فهرست کامل در اختیار شما قرار می‌دهد. روشی ساده و سریع برای درک بهتر محتوای تصاویر.',
    image: '/images/elements.png',
    path: '/elements',
    color: '#3399D4',
    bg: '#EBF8FF',
  }
]

export default function Home() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 2, position: 'relative' }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#2C3E50',
            mb: 2,
          }}
        >
          ابزار ها
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, mx: -3, border: '1px solid #F1F5F9' }} />
      <Stack spacing={6}>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: '#334155',
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          یکی از ویژگی سازها را انتخاب کنید
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 2 }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {featureCards.map((card) => (
            <FeatureCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              color={card.color}
              onClick={() => handleCardClick(card.path)}
              bg={card.bg}
            />
          ))}
        </Stack>
      </Stack>
    </>
  )
}

'use client'

import React from 'react'
import { Box, Typography, Stack, IconButton, Divider } from '@mui/material'
import { useRouter } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home';
import FeatureCard from './components/Card/FeatureCard'
import { featureCards } from './libs/data/feature';
import HeaderLayout from './components/Header';

export default function Home() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
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
        یکی از ویژگی سازها را انتخاب کنید :
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
  )
}

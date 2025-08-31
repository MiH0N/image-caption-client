'use client'

import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Stack } from '@mui/material'
import Image from 'next/image'
import { ChevronLeft } from '@mui/icons-material'

interface FeatureCardProps {
  id: string
  title: string
  description: string
  image: string
  color: string
  onClick: () => void;
  bg: string
}

export default function FeatureCard({
  bg,
  title,
  description,
  image,
  color,
  onClick
}: FeatureCardProps) {
  const [isHover, setIsHover] = useState(false)
  return (
    <Card
      component='button'
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      sx={{
        width: { xs: '100%', sm: '280px', md: '210px' },
        height: { xs: 'auto', md: '280px' },
        minHeight: { xs: '200px', md: '265px' },
        borderRadius: '12px',
        border: '1px solid #F8FAFC',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible',
        boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.008)',
          boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.05)',
        }
      }}
    >
      <CardContent sx={{
        p: '12px',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Content Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack
            direction={'row'}
            spacing={{ md: 3 }}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: color,
                fontWeight: 500,
                mb: 1,
                textAlign: 'left',
                fontSize: '16px',
              }}
            >
              {title}
            </Typography>
            <ChevronLeft sx={{ color, width: 20, height: 20 }} />
          </Stack>

          <Typography
            variant="caption"
            sx={{
              color: '#5D6D7E',
              lineHeight: 1.6,
              fontSize: '12px',
              textAlign: 'left',
              fontWeight: 400,
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '12px',
            // left: '35%',
            right: '30%',
            width: { xs: '80px', md: '80px' },
            height: { xs: '80px', md: '80px' },
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'all 0.6s ease',
            transform: isHover ? 'translateY(-6px)' : 'translateX(20%)'
          }}
        >
          <Image
            src={image}
            alt={title}
            width={80}
            height={80}
            style={{
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </Box>

        {/* Colored background accent */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: '73px',
            backgroundColor: bg,
            borderRadius: '12px'
          }}
        />
      </CardContent>
    </Card>
  )
}

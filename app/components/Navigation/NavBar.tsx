'use client'

import React from 'react'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { label: 'کپشن', path: '/caption' },
  { label: 'تگ‌گذاری', path: '/tags' },
  { label: 'پردازش تصویر', path: '/elements' },
]

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          هوش مصنوعی تصویر
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color={pathname === item.path ? 'primary' : 'inherit'}
              variant={pathname === item.path ? 'contained' : 'text'}
              onClick={() => router.push(item.path)}
              sx={{ minWidth: 100 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

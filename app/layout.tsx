'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import theme from "@/app/libs/configs/theme"
import "./globals.css";
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  })
  return (
    <html lang="fa">
      <body dir="rtl" style={{ height: "100vh" }}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                py: 8,
                backgroundColor: 'transparent',
                minHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#E2E8F0',
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', md: '726px' },
                  minHeight: { xs: 'auto', md: '620px' },
                  mx: 'auto',
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.02)',
                  p: 3
                }}
              >
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from "@/app/libs/configs/theme"
import "./globals.css";
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import NavBar from './components/Navigation/NavBar'

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
      <body dir="rtl">
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

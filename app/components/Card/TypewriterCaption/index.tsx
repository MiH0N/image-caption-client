'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography, CardActions, Tooltip, IconButton } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { copyToClipboard } from "@/app/libs/utils/clipboard"

interface TypewriterCaptionCardProps {
  text: string
  delay?: number
  startDelay?: number
}

export default function TypewriterCaptionCard({ 
  text, 
  delay = 50, 
  startDelay = 0 
}: TypewriterCaptionCardProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Reset state
    setDisplayedText('')
    setIsTyping(true)

    // Start typing after startDelay
    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeoutRef.current = setTimeout(typeNextChar, delay)
        } else {
          setIsTyping(false)
        }
      }

      typeNextChar()
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, delay, startDelay])

  const handleCopy = async () => {
    await copyToClipboard(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '12px',
        "&:hover": {
          boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.02)'
        },
      }}
    >
      <CardContent>
        <Typography sx={{ whiteSpace: 'pre-wrap', minHeight: '1.5em' }}>
          {displayedText}
          {isTyping && (
            <span 
              style={{ 
                animation: 'blink 1s infinite',
                marginLeft: '2px'
              }}
            >
              |
            </span>
          )}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Tooltip title={copied ? 'کپی شد' : 'کپی'}>
          <IconButton
            onClick={handleCopy}
            color={copied ? 'success' : 'default'}
            disabled={isTyping}
          >
            {copied
              ? <CheckIcon sx={{ width: 20, height: 20 }} />
              : <ContentCopyIcon sx={{ width: 20, height: 20 }} />}
          </IconButton>
        </Tooltip>
      </CardActions>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Card>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Chip } from '@mui/material'

interface TypewriterChipProps {
  label: string
  delay?: number
  startDelay?: number
  variant?: 'filled' | 'outlined'
}

export default function TypewriterChip({ 
  label, 
  delay = 50, 
  startDelay = 0,
  variant = 'outlined'
}: TypewriterChipProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
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
        if (currentIndex < label.length) {
          setDisplayedText(label.slice(0, currentIndex + 1))
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
  }, [label, delay, startDelay])

  return (
    <Chip 
      label={
        <span>
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
        </span>
      } 
      variant={variant}
      sx={{
        '& .MuiChip-label': {
          minWidth: '1em'
        }
      }}
    />
  )
}

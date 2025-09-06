'use client'

import React, { useEffect, useRef, useState } from 'react'
import { copyToClipboard } from "@/app/libs/utils/clipboard"
import Chip from "@mui/material/Chip"
import DoneIcon from '@mui/icons-material/Done';
import CopyAll from '@mui/icons-material/CopyAll';
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

interface TypewriterChipsTagProps {
  text: string
  delay?: number
  startDelay?: number
}

export default function TypewriterChipsTag({ 
  text, 
  delay = 50, 
  startDelay = 0 
}: TypewriterChipsTagProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
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
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  const copiedStyle = isCopied ? "success" : "primary"

  return (
    <>
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
        color={copiedStyle}
        variant={"outlined"}
        onClick={handleCopy}
        onDelete={handleCopy}
        deleteIcon={isCopied ? <DoneIcon sx={{ height: 16 }} /> : <CopyAll sx={{ height: 16 }} />}
        disabled={isTyping}
        sx={{
          '& .MuiChip-label': {
            minWidth: '1em'
          }
        }}
      />
      <Snackbar
        open={isCopied}
        autoHideDuration={1200}
        sx={{ bgcolor: 'skyblue' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <SnackbarContent
          sx={{
            bgcolor: '#198754',
            color: 'white',
          }}
          message="کپی شد"
        />
      </Snackbar>
    </>
  );
}

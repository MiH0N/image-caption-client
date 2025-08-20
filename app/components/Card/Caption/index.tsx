import { copyToClipboard } from "@/app/libs/utils/clipboard"
import { Card, CardContent, Typography, CardActions, Tooltip, IconButton } from "@mui/material"
import { useState } from "react"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'

export default function CaptionCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await copyToClipboard(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{text}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Tooltip title={copied ? 'کپی شد' : 'کپی'}>
          <IconButton onClick={handleCopy} color={copied ? 'success' : 'default'}>
            {copied ? <CheckIcon /> : <ContentCopyIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}


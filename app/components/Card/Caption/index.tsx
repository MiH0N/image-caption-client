import { copyToClipboard } from "@/app/libs/utils/clipboard"
import { Card, CardContent, Typography, CardActions, Tooltip, IconButton, Divider } from "@mui/material"
import { useState, forwardRef } from "react"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'

interface CaptionCardProps {
  text: string
}

const CaptionCard = forwardRef<HTMLDivElement, CaptionCardProps>(
  ({ text }, ref) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      await copyToClipboard(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }

    return (
      <Card
        ref={ref}
        variant="outlined"
        sx={{
          borderRadius: '12px',
          "&:hover": {
            boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.02)'
          },
        }}
      >
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{text}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title={copied ? 'کپی شد' : 'کپی'}>
            <IconButton
              onClick={handleCopy}
              color={copied ? 'success' : 'default'}
            >
              {copied
                ? <CheckIcon sx={{ width: 20, height: 20 }} />
                : <ContentCopyIcon sx={{ width: 20, height: 20 }} />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
)

CaptionCard.displayName = "CaptionCard"

export default CaptionCard

import { copyToClipboard } from "@/app/libs/utils/clipboard"
import Chip from "@mui/material/Chip"
import { FC, useState } from "react"
import TagIcon from '@mui/icons-material/Tag';
import DoneIcon from '@mui/icons-material/Done';
import CopyAll from '@mui/icons-material/CopyAll';
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
interface ChipsTagProps {
  text: string
}

const ChipsTag: FC<ChipsTagProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = async () => {
    await copyToClipboard(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }
  const copiedStyle = isCopied ? "success" : "primary"

  return (
    <>
      <Chip
        label={text}
        color={copiedStyle}
        variant={"outlined"}
        onClick={handleCopy}
        onDelete={handleCopy}
        deleteIcon={isCopied ? <DoneIcon sx={{ height: 16 }} /> : <CopyAll sx={{ height: 16 }} />}
        // icon={<TagIcon sx={{ height: 16 }} />}
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

export default ChipsTag;
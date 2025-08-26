import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImageZoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  previewUrl: string | null;
}

export default function ImageZoom({
  open,
  previewUrl,
  setOpen,
}: ImageZoomProps) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            alt="Big Preview"
            sx={{
              minWidth: "400px",
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: 2,
              bgcolor: "white",
            }}
          />
        )}
      </Box>
    </Modal>
  );
}

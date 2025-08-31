"use client";

import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import ImageZoom from "../ImageZoom";

export type ImageUploadDropzoneProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
};

const DropArea = styled("div")(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  height: "200px !important",
}));

export default function ImageUploadDropzone({
  value,
  onChange,
}: ImageUploadDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const resetInputElement = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const openFileDialog = () => {
    resetInputElement();
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (file) {
      onChange(file);
    } else {
      onChange(null);
    }
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {!value ? (
        <DropArea
          role="button"
          onClick={openFileDialog}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <CloudUploadIcon fontSize="large" />
            <Typography variant="body1">
              برای آپلود تصویر، روی اینجا کلیک کنید
            </Typography>
            <Typography variant="caption">PNG, JPG, GIF, HEIC</Typography>
          </Box>
        </DropArea>
      ) : (
        <Box>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: "300px",
                height: "200px",
                objectFit: "contain",
                borderRadius: 1,
              }}
            />
          )}
          <Box display="flex" mt={2}>
            <Tooltip title="حذف تصویر">
              <IconButton
                color="error"
                onClick={() => {
                  resetInputElement();
                  onChange(null);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="بزرگنمایی تصویر">
              <IconButton color="default" onClick={() => setOpen(true)}>
                <CropFreeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="تغییر تصویر">
              <IconButton color="primary" onClick={openFileDialog}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}

      <ImageZoom open={open} setOpen={setOpen} previewUrl={previewUrl} />
    </>
  );
}

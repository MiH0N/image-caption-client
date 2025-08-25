import { Home as HomeIcon } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface HeaderLayoutProps {
  header: string
  action?: () => void
}
const HeaderLayout: FC<HeaderLayoutProps> = ({
  header,
  action
}) => {
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 2, position: 'relative' }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#2C3E50',
            mb: 2,
          }}
        >
          {header}
        </Typography>
        {action &&
          <IconButton
            onClick={() => action()}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <HomeIcon />
          </IconButton>
        }
      </Box>
      <Divider sx={{ mb: 2, mx: -3, border: '1px solid #F1F5F9' }} />
    </>
  );
}

export default HeaderLayout;
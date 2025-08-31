import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";

const theme = createTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: "Dana, DanaFaNum, Arial, sans-serif",
    },
    palette: {
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            transition : 'all 0.2s ease'
          },
        },
      },
    },
  },
  faIR
);

export default theme;

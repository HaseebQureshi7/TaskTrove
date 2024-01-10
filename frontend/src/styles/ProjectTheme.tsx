import { createTheme, PaletteMode } from "@mui/material";

const ProjectTheme = (themeMode: PaletteMode) =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#DE2D35",
      },
      secondary: {
        main: "#2E7BEE",
      },
    },
    typography: {
      fontFamily: "Poppins"
    }
  });

export default ProjectTheme
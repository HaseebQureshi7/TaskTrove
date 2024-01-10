import { Add, DarkMode, LightMode, Menu } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import DFlex from "./../../styles/Flex";
import DarkModeContext from "../../context/DarkModeContext";
import { useContext } from "react";

export default function Appbar({ userData, openSidebar, setOpenSidebar }: any) {
  const { themeMode, setThemeMode } = useContext(DarkModeContext);
  return (
    <>
      <Box
        sx={{
          ...DFlex,
          flexDirection: "row",
          backgroundColor: "background.default",
          justifyContent: "flex-end",
          width: "100%",
          height: "60px",
          px: {xs:2.5,lg:5},
          // borderBottom: "2px solid lightgrey",
        }}
      >
        <Box
          sx={{
            flex: 3,
            ...DFlex,
            marginLeft:openSidebar,
            display: { xs: "flex", lg: "none" },
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Menu
            sx={{
              display: { xs: "inherit", lg: "none" },
              color: "text.primary",
            }}
            onClick={() =>
              setOpenSidebar(openSidebar == "0vw" ? "20vw" : "0vw")
            }
          />
        </Box>
        {themeMode == "dark" ? (
          <LightMode
            onClick={() =>
              setThemeMode(themeMode == "light" ? "dark" : "light")
            }
            sx={{
              width: "25px",
              height: "25px",
              color: "text.primary",
              cursor: "pointer",
              "&:hover": {
                rotate: "45deg",
                filter: "invert(0.5)",
                position: "relative",
                transform: "scale(1.25)",
                transition: "all 1s ease ",
              },
              "&:not(:hover)": {
                rotate: "0deg",
                position: "inline",
                transform: "scale(1)",
                transition: "all 1s ease ",
              },
            }}
          />
        ) : (
          <DarkMode
            onClick={() =>
              setThemeMode(themeMode == "light" ? "dark" : "light")
            }
            sx={{
              width: "25px",
              height: "25px",
              color: "text.primary",
              cursor: "pointer",
              "&:hover": {
                rotate: "25deg",
                filter: "invert(0.5)",
                position: "relative",
                transform: "scale(1.25)",
                transition: "all 1s ease ",
              },
              "&:not(:hover)": {
                rotate: "0deg",
                position: "inline",
                transform: "scale(1)",
                transition: "all 1s ease ",
              },
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "100%" },
          ml: "auto",
          height: "1.5px",
          // background: "linear-gradient(to right, #ffffff, lightgrey)",
          backgroundColor: "grey",
        }}
      />
    </>
  );
}

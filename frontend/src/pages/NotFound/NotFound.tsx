import { Box, Button, Typography } from "@mui/material";
import DFlex from "./../../styles/Flex";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import isXSmall from "../../utils/isXSmall";

function NotFound() {
  const navigate = useNavigate();
  const {isXS} = isXSmall()
  return (
    <Box
      sx={{
        ...DFlex,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        backgroundImage: "url(/images/404-bg.gif)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        gap:2.5
      }}
    >
      <Typography sx={{ color: "text.primary" }} variant={isXS?"h2":"h1"}>
        404
      </Typography>
      <Typography sx={{ color: "text.primary" }} variant={isXS?"h5":"h3"}>
        Page Not Found
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        size="medium"
        startIcon={<ArrowBack />}
        sx={{
          // backgroundColor: "rgb(217, 217, 217, 0.15)",
          paddingX: 5,
          borderRadius: 50,
          color: "white",
          border: "1px solid rgb(217, 217, 217, 0.35)",
          marginRight: 1,
          marginTop: 1,
        }}
      >
        Take Me Back
      </Button>
    </Box>
  );
}

export default NotFound;

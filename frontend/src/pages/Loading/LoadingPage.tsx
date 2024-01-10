import { Box, LinearProgress } from "@mui/material";
import DFlex from "./../../styles/Flex";

function LoadingPage() {
  return (
    <Box sx={{ ...DFlex, width: "100vw", height: "100vh", backgroundColor:"#121212" }}>
      {/* <Box sx={{width:"250px"}} component={"img"} src="/images/loader.gif" /> */}
      <Box sx={{width:"100px", aspectRatio:1, zIndex:2}} component={"img"} src="/images/logo-light.png" />
      <LinearProgress color="inherit" sx={{width:"50vw", backgroundColor:'white'}}/>
    </Box>
  );
}

export default LoadingPage;

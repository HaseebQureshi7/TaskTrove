import { Box, Button, Typography } from "@mui/material";
import DFlex from "./../styles/Flex";
import isXSmall from "../utils/isXSmall";
import { useNavigate } from "react-router-dom";
import Typewriter from "react-ts-typewriter";

function Index() {
  const { isXS } = isXSmall();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        ...DFlex,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        backgroundImage: "url(/images/landing-bg.gif)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 10vh",
      }}
    >
      <Box
        sx={{
          ...DFlex,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "90%",
          height: "90%",
          // flexDirection: { xs: "column-reverse", lg: "column" },
          backgroundColor: "rgb(217, 217, 217, 0.15)",
          // backgroundImage: "url(/images/landing-cont-bg.gif)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: { xs: "100%", lg: "30%" },
          borderRadius: 4,
        }}
      >
        {/* TOP-BOX */}
        <Box
          sx={{
            ...DFlex,
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            width: "100%",
            justifyContent: "space-between",
            // px: 5,
          }}
        >
          <Box component={"img"} src="/images/logo-light.png" />
          <Button
            onClick={() => navigate("/login", { state: { role: "admin" } })}
            size="small"
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
            Administrator
          </Button>
        </Box>
        {/* MID-BOX */}
        <Box sx={{ ...DFlex, width: "100%", height: "60%" }}>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              textShadow: "5px 5px 40px rgba(46, 123, 238, 1)",
            }}
            variant={isXS ? "h5" : "h1"}
          >
            Catalyzing Success,
          </Typography>
          <Typography
            variant={isXS ? "h5" : "h1"}
            sx={{
              color: "white",
              textAlign: "center",
              textShadow: "5px 5px 40px rgba(46, 123, 238, 1)",
            }}
          >
            <Typewriter
              text={"Bridging Skills"}
              speed={0}
              random={-10}
              cursor={true}
            />
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgb(217, 217, 217, 1)",
              textAlign: "center",
              width: "80%",
              fontSize: { xs: "0.5rem", lg: "1rem" },
              marginTop: 5,
              textDecoration: "underline",
              fontWeight: 500,
              // textShadow: "5px 5px 40px rgba(46, 123, 238, 0.5)",
            }}
          >
            Join us and discover a world of unparalleled services, delivering an
            experience among the very best you've ever known.
          </Typography>
        </Box>
        {/* BUTTON-BOX */}
        <Box
          sx={{
            ...DFlex,
            flexDirection: "row",
            width: "100%",
            gap: { xs: 1.5, lg: 10 },
          }}
        >
          <Button
            onClick={() => navigate("/login", { state: { role: "client" } })}
            // size="small"
            sx={{
              backgroundColor: "rgb(217, 217, 217, 0.25)",
              paddingX: 5,
              borderRadius: 50,
              color: "white",
              border: "1px solid rgb(217, 217, 217, 0.85)",
              marginRight: 1,
              marginTop: 1,
            }}
          >
            &nbsp; &nbsp; Client &nbsp; &nbsp;
          </Button>
          <Button
            onClick={() =>
              navigate("/login", { state: { role: "freelancer" } })
            }
            // size="small"
            sx={{
              backgroundColor: "rgb(217, 217, 217, 0.25)",
              paddingX: 5,
              borderRadius: 50,
              color: "white",
              border: "1px solid rgb(217, 217, 217, 0.85)",
              marginRight: 1,
              marginTop: 1,
            }}
          >
            Freelancer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;

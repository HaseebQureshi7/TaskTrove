import { Avatar, Box, ButtonBase, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClientLogo from "/images/client-logo.png";
import FreelancerLogo from "/images/fl-logo.png";
import AdminLogo from "/images/admin-logo.png";
// import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
// import { ExtractedSnackBarTypes } from "./../types/SnackbarTypes";
import DFlex from "./../../styles/Flex";
import {
  AccountTree,
  Block,
  Dashboard as DashboardIcon,
  Engineering,
  PowerSettingsNew,
  Verified,
} from "@mui/icons-material";
import UserTypes from "../../types/UserTypes";
import isXSmall from "../../utils/isXSmall";

type openSidebarTypes = "0vw" | "5vw" | "20vw";

type SidebarPropTypes = {
  user: UserTypes;
  openSidebar: openSidebarTypes;
  setOpenSidebar: (user: openSidebarTypes) => void;
};

export default function Sidebar({
  user,
  openSidebar,
  setOpenSidebar,
}: SidebarPropTypes) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isXS } = isXSmall();

  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  //   const { openSnack, setOpenSnack } = useContext<ExtractedSnackBarTypes>(
  //     GlobalSnackbarContext
  //   );

  return (
    <Box
      sx={{
        width: openSidebar,
        transition: "width 0.1s ease-in-out",
      }}
    >
      <Box
        sx={{
          ...DFlex,
          position: "fixed",
          display: openSidebar == "0vw" ? "none" : "flex",
          zIndex: 2,
          gap: 1,
          justifyContent: "flex-start",
          width: openSidebar,
          height: "100vh",
          backgroundColor: "background.default",
          // boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          borderRight: "2px solid grey",
          transition: "width 0.1s ease-in-out",
          role: "fixed",
        }}
        onMouseOver={() => setOpenSidebar("20vw")}
        onMouseOut={() => setOpenSidebar("5vw")}
      >
        {/* HEAD */}
        <Box
          sx={{
            ...DFlex,
            flex: 4,
            mt: openSidebar == "5vw" ? 5 : 7.5,
            gap: !isXS ? 1.5 : 0,
            transition: "all .5s",
            height: "25vh",
          }}
        >
          <Avatar
            src={
              user?.role === "client"
                ? ClientLogo
                : user?.role === "freelancer"
                ? FreelancerLogo
                : AdminLogo
            }
            sx={{
              width: {
                xs: openSidebar == "5vw" ? "0" : "35px",
                lg: openSidebar == "5vw" ? "40px" : "75px",
              },
              height: {
                xs: openSidebar == "5vw" ? "0" : "35px",
                lg: openSidebar == "5vw" ? "40px" : "75px",
              },
              transition: "0.5s all",
            }}
          />
          <Typography
            sx={{
              opacity: openSidebar == "5vw" ? "0" : "1",
              display: { xs: "none", lg: "inherit" },
              color: "text.primary",
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "0.1s opacity",
              transitionDelay: "0.05s",
            }}
            variant="h6"
          >
            {user?.name}
          </Typography>
          <Typography
            sx={{
              opacity: openSidebar == "5vw" ? "0" : "1",
              display: { xs: "none", lg: "inherit" },
              color: "white",
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "0.1s opacity",
              transitionDelay: "0.15s",
              borderRadius: 100,
              px: 2,
              backgroundColor: "red",
            }}
            variant="body2"
          >
            {user?.role}
          </Typography>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* CLIENT ACTIONS CONTAINER */}
        {user?.role === "client" && (
          <Box
            sx={{
              ...DFlex,
              width: "100%",
              justifyContent: "flex-start",
              gap: isXS ? 5 : 0,
              height: "65vh",
            }}
          >
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("/client")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                // ml: openSidebar === "5vw" ? 4 : 0,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                gap: 2,
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <DashboardIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname == "/client" ? "red" : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  color: location.pathname == "/client" ? "red" : "inherit",
                  fontWeight: 500,
                }}
                variant="body1"
              >
                Dashboard
              </Typography>
            </Box>
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("your-projects")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <AccountTree
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname.includes("your-projects")
                    ? "red"
                    : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  fontWeight: 500,
                  color: location.pathname.includes("your-projects")
                    ? "red"
                    : "inherit",
                }}
                variant="body1"
              >
                Your Projects
              </Typography>
            </Box>
          </Box>
        )}

        {/* FREELANCER ACTIONS CONTAINER */}
        {user?.role === "freelancer" && (
          <Box
            sx={{
              ...DFlex,
              width: "100%",
              justifyContent: "flex-start",
              gap: isXS ? 5 : 0,
              height: "65vh",
            }}
          >
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("/freelancer")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                // ml: openSidebar === "5vw" ? 4 : 0,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                gap: 2,
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <DashboardIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname == "/freelancer" ? "red" : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  color: location.pathname == "/freelancer" ? "red" : "inherit",
                  fontWeight: 500,
                }}
                variant="body1"
              >
                Dashboard
              </Typography>
            </Box>
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("all-projects")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <AccountTree
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname.includes("all-projects")
                    ? "red"
                    : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  color: location.pathname.includes("all-projects")
                    ? "red"
                    : "inherit",
                  fontWeight: 500,
                }}
                variant="body1"
              >
                All Projects
              </Typography>
            </Box>
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("completed-projects")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <Verified
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname.includes("completed-projects")
                    ? "red"
                    : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  color: location.pathname.includes("completed-projects")
                    ? "red"
                    : "inherit",
                  fontWeight: 500,
                }}
                variant="body1"
              >
                Completed Projects
              </Typography>
            </Box>
          </Box>
        )}

        {/* ADMIN ACTIONS CONTAINER */}
        {user?.role === "admin" && (
          <Box
            sx={{
              ...DFlex,
              width: "100%",
              justifyContent: "flex-start",
              gap: isXS ? 5 : 0,
              height: "65vh",
            }}
          >
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("/admin")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                // ml: openSidebar === "5vw" ? 4 : 0,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                gap: 2,
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <DashboardIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname == "/admin" ? "red" : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  color: location.pathname == "/admin" ? "red" : "inherit",
                  fontWeight: 500,
                }}
                variant="body1"
              >
                Dashboard
              </Typography>
            </Box>
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("all-freelancers")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <Engineering
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname.includes("/all-freelancers")
                    ? "red"
                    : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  fontWeight: 500,
                  color: location.pathname.includes("/all-freelancers")
                    ? "red"
                    : "inherit",
                }}
                variant="body1"
              >
                All Freelancers
              </Typography>
            </Box>
            {/* ACTION TAB */}
            <Box
              onClick={() => navigate("all-projects")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop: "1px solid red",
                  borderBottom: "1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
            >
              <AccountTree
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color: location.pathname.includes("/all-projects")
                    ? "red"
                    : "inherit",
                }}
              />
              <Typography
                sx={{
                  display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                  fontWeight: 500,
                  color: location.pathname.includes("/all-projects")
                    ? "red"
                    : "inherit",
                }}
                variant="body1"
              >
                All Projects
              </Typography>
            </Box>
            {/* ACTION TAB */}
            {/* <Box
            onClick={() => navigate("blocked-freelancers")}
              sx={{
                ...DFlex,
                flexDirection: "row",
                gap: 2,
                justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
                width: "100%",
                p: !isXS ? 1.5 : 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  borderTop:"1px solid red",
                  borderBottom:"1px solid #5A99F6",
                  pl: openSidebar === "5vw" ? 0 : 4,
                },
              }}
              >
              <Block
                sx={{
                  width: "30px",
                  height: "30px",
                  ml: openSidebar === "5vw" ? 0 : 3,
                  transition: "all 0.5s ease",
                  color:
                  location.pathname.includes("/blocked-freelancers") ? "red" : "inherit",
                }}
                />
              <Typography
                sx={{
                  display: openSidebar == "20vw" ? "inherit" : "none",
                  fontWeight: 500,
                  color:
                  location.pathname.includes("/blocked-freelancers") ? "red" : "inherit",
                }}
                variant="body1"
                >
                Blocked Freelancers
              </Typography>
            </Box> */}
          </Box>
        )}

        <Divider sx={{ width: "100%", my: 2 }} />
        {/* LOGOUT ACTION CONTAINER */}
        <Box
          sx={{
            ...DFlex,
            width: "100%",
            justifyContent: "flex-start",
            gap: 0,
            height: "15vh",
          }}
        >
          {/* LOGOUT TAB */}
          <Box
            onClick={() => {
              Logout();
            }}
            sx={{
              ...DFlex,
              flexDirection: "row",
              gap: 2,
              justifyContent: openSidebar === "5vw" ? "center" : "flex-start",
              width: "100%",
              p: !isXS ? 1.5 : 0,
              cursor: "pointer",
              pl: openSidebar === "5vw" ? 1.5 : 3,
              transition: "all 0.3s ease",
              ":hover": {
                backgroundColor: "whitesmoke",
              },
            }}
          >
            <PowerSettingsNew
              sx={{
                width: "30px",
                height: "30px",
                color: "red",
              }}
            />
            <Typography
              sx={{
                display: !isXS && openSidebar == "20vw" ? "inherit" : "none",
                color: "red",
                fontWeight: 500,
              }}
              variant="body1"
            >
              LOG OUT
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

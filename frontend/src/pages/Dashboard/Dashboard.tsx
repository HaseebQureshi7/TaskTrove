import { Box } from "@mui/material";
import { SetStateAction, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Appbar from "../../components/ui/Appbar";
import UserDataContext from "../../context/UserDataContext";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import isXSmall from "../../utils/isXSmall";

function Dashboard() {
  const { isXS } = isXSmall();

  const { userData, setUserData }: UserDataContextTypes =
    useContext(UserDataContext);

  const [openSidebar, setOpenSidebar]: any = useState(isXS ? "0vw" : "5vw");
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          color: "text.primary",
          backgroundColor: "background.default",
        }}
      >
        <Sidebar
          user={userData}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {/* APPBAR */}
          <Appbar
            user={userData}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
          <Outlet />
          {/* FOOTER */}
          {/* <Box
            sx={{
              ...DFlex,
              height: "5vh",
              backgroundColor: "background.default",
              color: "text.primary",
              borderTop: "2px solid lightgrey",
            }}
          >
            <Typography variant="subtitle1">
              Developed by{" "}
              <Typography
                sx={{
                  color: "inherit",
                  fontWeight: 500,
                }}
                component="a"
                href={"https://hiam.vercel.app/anonymous/users/2"}
              >
                Haseeb Qureshi
              </Typography>
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;

import { ThemeProvider } from "@emotion/react";
import ProjectTheme from "./styles/ProjectTheme";
import MainNavigator from "./navigator/MainNavigator";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAxios from "./hooks/useAxios";
import UserDataContext from "./context/UserDataContext";
import SnackbarContext from "./context/SnackbarContext";
import { SnackbarTypes } from "./types/SnackbarTypes";
import GlobalSnackbar from "./components/ui/Snackbar";
import DarkModeContext from "./context/DarkModeContext";
import { Box, LinearProgress, PaletteMode } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "./pages/Loading/LoadingPage";
import UserTypes from "./types/UserTypes";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type UserDataStateTypes = {
  userData: UserTypes;
  setUserData: Dispatch<SetStateAction<UserTypes>>;
};

function App() {
  const [userData, setUserData] = useState<UserDataStateTypes>();
  const [initialLoading, setInitialLoading] = useState<Boolean>(false);
  const [isServerSpooling, setIsServerSpooling] = useState<Boolean>(true);
  const [themeMode, setThemeMode] = useState<PaletteMode>("dark");
  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const isBaseRoute: boolean =
    !location.pathname.includes("admin") &&
    !location.pathname.includes("freelancer") &&
    !location.pathname.includes("client");

  useEffect(() => {
    // THIS API PINGS THE SERVER SO THE SERVER CAN BOOT UP FROM THE SLEEP.
    // const timeoutPromise: any = () =>
    //   Promise.race([
    //     useAxios("ping").then(() => {
    //       setIsServerSpooling(false);
    //     }),
    //     new Promise(() =>
    //       setTimeout(() => {
    //         return "server still spooling"
    //       }, 3000)
    //     ),
    //   ]);

    // timeoutPromise()
    if (isBaseRoute && isServerSpooling) {
      setOpenSnack({
        open: true,
        message:
          "Server is spooling up! Please wait until the loader on top is gone.",
        severity: "info",
      });
    }

    else {
      setIsServerSpooling(false)
    }

    useAxios("ping")
      .then(() => {
        if (isBaseRoute) {
          setIsServerSpooling(false);
          setOpenSnack({
            open: true,
            message: "Server is now active!",
            severity: "success",
          });
        }
      })
      .catch((err) => console.log(err));

    // AUTO-LOGIN
    const autoLogin = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          setInitialLoading(true);
          const response = await useAxios.post("user/loginWithToken", {
            token,
          });
          setUserData(response.data.user);
          localStorage.setItem("token", response.data.token);
          setInitialLoading(false);
          if (isBaseRoute) {
            navigate(`/${response.data.user.role}`);
          } else {
            console.log("on dashboard");
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
      else {
        !isBaseRoute && navigate(`/`)
      }
    };

    autoLogin();
  }, []);

  if (initialLoading) {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        color: "text.primary",
        background: "background.default",
        overflowX: "hidden",
      }}
    >
      <LinearProgress
        color="inherit"
        sx={{
          display: isServerSpooling ? "inherit" : "none",
          backgroundColor: "white",
        }}
      />
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <GlobalSnackbar value={{ openSnack, setOpenSnack }} />
        <DarkModeContext.Provider value={{ themeMode, setThemeMode }}>
          <SnackbarContext.Provider value={{ openSnack, setOpenSnack }}>
            <ThemeProvider theme={ProjectTheme(themeMode)}>
              <MainNavigator />
            </ThemeProvider>
          </SnackbarContext.Provider>
        </DarkModeContext.Provider>
      </UserDataContext.Provider>
      {/* <ReactQueryDevtools/> */}
    </Box>
  );
}

export default App;

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
import { Box, PaletteMode } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "./pages/Loading/LoadingPage";
import UserTypes from "./types/UserTypes";

type UserDataStateTypes = {
  userData: UserTypes;
  setUserData: Dispatch<SetStateAction<UserTypes>>;
};

function App() {
  const [userData, setUserData] = useState<UserDataStateTypes>();
  const [initialLoading, setInitialLoading] = useState<Boolean>(false);
  const [themeMode, setThemeMode] = useState<PaletteMode>("dark");
  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // THIS API PINGS THE SERVER SO THE SERVER CAN BOOT UP FROM THE SLEEP.
    useAxios("ping")
      .then((res) => console.log(res.data))
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
          if (
            !location.pathname.includes("admin") &&
            !location.pathname.includes("freelancer") &&
            !location.pathname.includes("client")
          ) {
            navigate(`/${response.data.user.role}`);
          } else {
            console.log("on dashboard");
          }
        } catch (error: any) {
          console.log(error.message);
        }
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
    </Box>
  );
}

export default App;

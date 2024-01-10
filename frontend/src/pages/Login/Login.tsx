import { Box, Button, TextField, Typography } from "@mui/material";
import DFlex from "../../styles/Flex";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import UserDataContext from "../../context/UserDataContext";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import loginDataTypes from "../../types/LoginDataTypes";
import isXSmall from "../../utils/isXSmall";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import SnackbarContext from "../../context/SnackbarContext";

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isXS } = isXSmall();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { setUserData }: UserDataContextTypes = useContext(UserDataContext);

  const LoginMF = (loginData: loginDataTypes) => {
    return useAxios.post("user/login", loginData);
  };

  const { status, mutate } = useMutation({
    mutationFn: LoginMF,
    onSuccess: (data: any) => {
      setUserData(data.data.user);
      localStorage.setItem("token", data.data.token);
      navigate(`/${data.data.user.role}`);
    },
    onError: (err) => {
      console.log(err.message);
      setOpenSnack({
        open: true,
        message: "Invalid email or password",
        severity: "error",
      });
    },
  });

  function HandleLogin(e: FormEvent) {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;

    const userLoginData: any = {
      email,
      password,
    };

    mutate(userLoginData);
  }

  return (
    <Box
      sx={{
        ...DFlex,
        flexDirection: "row",
        color: "text.primary",
        background: "#121212",
      }}
    >
      {/* left-side */}
      <Box
        sx={{
          flex: 1,
          display: isXS ? "none" : "inherit",
          height: "100vh",
          backgroundImage:
            state?.role == "client"
              ? "url(/images/loginBg.png)"
              : state?.role == "freelancer"
              ? "url(/images/flbg.png)"
              : "url(/images/adminbg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "0% 50%",
        }}
      ></Box>
      {/* right-side */}
      <Box sx={{ ...DFlex, flex: 1, height: "100vh", gap: 5 }}>
        {/* header */}
        <Box sx={{ ...DFlex }}>
          <Typography variant="h5">LOG IN</Typography>
          <Typography sx={{ color: "grey" }} variant="body2">
            Welcome back! Please enter your details
          </Typography>
        </Box>
        {/* login-form */}
        <Box
          sx={{ ...DFlex, width: "100%", gap: 5, paddingX: 10 }}
          component={"form"}
          onSubmit={HandleLogin}
        >
          <TextField
            required
            sx={{ width: "100%" }}
            label="Email"
            name="email"
            type="email"
          />
          <TextField
            required
            sx={{ width: "100%" }}
            label="Password"
            name="password"
            type="password"
          />
          <Button
            disabled={status === "pending"}
            sx={{ width: "100%" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </Box>
        {/* or-block */}
        {state?.role !== "admin" && (
          <Box
            sx={{
              ...DFlex,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingX: 10,
            }}
          >
            <Box
              sx={{ width: "25%", height: "1px", backgroundColor: "lightgrey" }}
            />
            <Typography variant="body2" fontWeight={500} color={"grey"}>
              OR
            </Typography>
            <Box
              sx={{ width: "25%", height: "1px", backgroundColor: "lightgrey" }}
            />
            {/* <Box/> */}
          </Box>
        )}

        {state?.role !== "admin" && (
          <Box>
            <Typography
              sx={{ ...DFlex, flexDirection: "row", gap: 0.5 }}
              variant="body1"
              fontWeight={500}
              color={"grey"}
            >
              Not a member yet?
              <Button
                onClick={() =>
                  navigate("/signup", { state: { role: state?.role } })
                }
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                Signup here
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Login;

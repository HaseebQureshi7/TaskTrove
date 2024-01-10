import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import loginDataTypes from "../../types/LoginDataTypes";
import useAxios from "../../hooks/useAxios";
import { FormEvent, useContext } from "react";
import UserDataContext from "../../context/UserDataContext";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import SnackbarContext from "./../../context/SnackbarContext";
import DFlex from "./../../styles/Flex";
import isXSmall from "../../utils/isXSmall";

function Signup() {
  const navigate = useNavigate();
  const { state } = useLocation(); // EDGE CASE --> If the user directly goes to the signup page the role will be null
  const { isXS } = isXSmall();

  const { setUserData }: UserDataContextTypes = useContext(UserDataContext);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const LoginMF: any = (signupData: loginDataTypes) => {
    return useAxios.post("user/signup", signupData);
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
        message: "Account already exists on this email",
        severity: "warning",
      });
    },
  });

  function HandleSignup(e: FormEvent) {
    e.preventDefault();
    const name = (e.currentTarget as HTMLFormElement).username.value;
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const role =
      state?.role || (e.currentTarget as HTMLFormElement).SignupAs.value;
    const password: string = (e.currentTarget as HTMLFormElement).password
      .value;
    const confirmPassword = (e.currentTarget as HTMLFormElement).confirmPassword
      .value;

    if (password?.length > 5) {
      if (password === confirmPassword) {
        const userSignupData: any = {
          name,
          email,
          password,
          role: role, // VULNURABILITY HERE !!!
        };

        mutate(userSignupData);
      } else {
        setOpenSnack({
          open: true,
          message: "Passwords do not match!",
          severity: "warning",
        });
      }
    } else {
      setOpenSnack({
        open: true,
        message: "Password too short!",
        severity: "warning",
      });
    }
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
          backgroundImage: "url(/images/loginBg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "0% 50%",
        }}
      ></Box>
      {/* right-side */}
      <Box sx={{ ...DFlex, flex: 1, height: "100vh", gap: 5 }}>
        {/* header */}
        <Box sx={{ ...DFlex }}>
          <Typography variant="h5">SIGNUP</Typography>
          <Typography sx={{ color: "grey" }} variant="body2">
            Welcome! Please enter your details
          </Typography>
        </Box>
        {/* signup-form */}
        <Box
          sx={{ ...DFlex, width: "100%", gap: 2.5, paddingX: {xs:2.5, lg:10} }}
          component={"form"}
          onSubmit={HandleSignup}
        >
          <TextField
            required
            sx={{ width: "100%" }}
            label="Name"
            name="username"
            type="text"
          />
          <TextField
            required
            sx={{ width: "100%" }}
            label="Email"
            name="email"
            type="email"
          />
          {state?.role == undefined && (
            <RadioGroup
              name="SignupAs"
              // defaultValue={"client"}
              sx={{
                ...DFlex,
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Typography sx={{ mr: "auto" }}>Register as: </Typography>
              <FormControlLabel
                required
                value="freelancer"
                control={<Radio />}
                label="Freelancer"
              />
              <FormControlLabel
                required
                value="client"
                control={<Radio />}
                label="Client"
              />
            </RadioGroup>
          )}
          <TextField
            required
            sx={{ width: "100%" }}
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            required
            sx={{ width: "100%" }}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Button
            disabled={status === "pending"}
            sx={{ width: "100%" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Signup
          </Button>
        </Box>
        {/* or-block */}
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
        </Box>

        <Box>
          <Typography
            sx={{ ...DFlex, flexDirection: "row", gap: 0.5 }}
            variant="body1"
            fontWeight={500}
            color={"grey"}
          >
            Already a member?
            <Button
              onClick={() => navigate("/login")}
              sx={{ textTransform: "capitalize", fontWeight: 500 }}
            >
              Login here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;

import { CreditCard } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarContext from "../../context/SnackbarContext";
import useAxios from "../../hooks/useAxios";
import BidTypes from "../../types/BidTypes";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import UserTypes from "../../types/UserTypes";
import isXSmall from "../../utils/isXSmall";
import DFlex from "./../../styles/Flex";
import ProjectTypes from "./../../types/ProjectTypes";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { isXS } = isXSmall();

  if (!state?.project) {
    navigate("/client");
  }

  const [allotedTo, setAllotedTo] = useState<UserTypes>();
  const [acceptedBid, setAcceptedBid] = useState<BidTypes>();
  const project: ProjectTypes = state.project;

  const GetClientsProjects = (transactionData: any) => {
    return useAxios.post(`transaction/addTransaction`, transactionData);
  };

  const { status, mutate } = useMutation({
    mutationFn: GetClientsProjects,
    onSuccess: () => {
      setOpenSnack({
        open: true,
        message: "Payment was successful!",
        severity: "success",
      }),
        navigate("/client");
    },
  });

  function HandleMakePayment(e: FormEvent) {
    e.preventDefault();
    const paymentId = Math.trunc(Math.random() * 100000000);
    const transactionData: any = {
      paymentId,
      paymentStatus: "successful",
      paymentTo: allotedTo?._id,
      paymentFrom: project?.projectOwner,
    };

    const ProjectData: any = {
      paymentReceived: true,
    };
    EditProjectMutation(ProjectData as ProjectTypes);
    mutate(transactionData);
  }

  const EditProjectMF = (ProjectData: ProjectTypes) => {
    return useAxios.put(`/project/editProject/${project?._id}`, ProjectData);
  };

  const { mutate: EditProjectMutation } = useMutation({
    mutationFn: EditProjectMF,
  });

  useEffect(() => {
    const getDataForPayment = async () => {
      await useAxios
        .get(`user/getUserById/${project?.allotedTo}`)
        .then((res) => setAllotedTo(res.data))
        .catch((err) => console.log(err));
      await useAxios
        .get(`bid/getBid/${project?.acceptedBid}`)
        .then((res) => setAcceptedBid(res.data))
        .catch((err) => console.log(err));
    };
    getDataForPayment();
  }, []);

  return (
    <Box sx={{ ...DFlex, width: "100%", gap: 2.5 }}>
      <Typography
        sx={{ fontStyle: "italic", marginTop: "10vh", marginBottom: "5vh" }}
        variant={isXS ? "h4" : "h2"}
      >
        Stripe Payment
      </Typography>
      <Typography sx={{}} variant="h5">
        Payment to : <span style={{ fontWeight: 600 }}>{allotedTo?.name}</span>
      </Typography>
      <Typography sx={{}} variant="h5">
        Payment of :{" "}
        <span style={{ fontWeight: 600 }}>${acceptedBid?.bidAmount}</span>
      </Typography>

      <Box
        onSubmit={HandleMakePayment}
        sx={{ ...DFlex, width: "75%", gap: 2.5 }}
        component={"form"}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCard />
              </InputAdornment>
            ),
          }}
          required
          sx={{ width: "75%" }}
          label="Debit Card Number"
          name="cardNumber"
          type="number"
        />

        <Button
          disabled={status === "pending"}
          sx={{ width: "75%" }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Pay ${acceptedBid?.bidAmount}
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentPage;

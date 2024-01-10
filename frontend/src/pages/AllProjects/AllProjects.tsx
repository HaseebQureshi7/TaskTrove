import {
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import DFlex from "./../../styles/Flex";
import ProjectCard from "../../components/ProjectCard";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProjectTypes from "../../types/ProjectTypes";
import GlobalModal from "../../components/ui/Modal";
import { FormEvent, useContext, useState } from "react";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import UserDataContext from "../../context/UserDataContext";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import SnackbarContext from "../../context/SnackbarContext";
import BidTypes from "../../types/BidTypes";
import { FadeFromSide } from "../../animations/PageTransition";
import PageHeading from "../../components/PageHeading";
import { AttachMoney } from "@mui/icons-material";

function AllProjects() {
  // DISABLE BID BUTTON IF A BID IS ALREADY ADDED.
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const [openModal, setOpenModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | undefined>("");

  const GetAllOpenProjects = () => {
    return useAxios.get(`project/viewAllProjects`);
  };

  const { data: allOpenProjects } = useQuery({
    queryKey: ["allOpenProjects"],
    queryFn: GetAllOpenProjects,
    select: (data) => {
      if (userData?.role === "admin") {
        return data.data;
      }
      return data.data.filter((project: ProjectTypes) => {
        return project.allotedTo == null;
      });
    },
  });

  const MakeABid = (bidData: BidTypes) => {
    return useAxios.post(`user/makeBid`, bidData);
  };

  const { status, mutate } = useMutation({
    mutationFn: MakeABid,
    onSuccess: () => {
      setOpenModal(false);
      setOpenSnack({
        open: true,
        message: "Your bid was added 🎉",
        severity: "success",
      });
    },
  });

  function HandleAddABid(e: FormEvent) {
    e.preventDefault();
    const bidAmount = (e.currentTarget as HTMLFormElement).BidAmount.value;

    const bidData: BidTypes = {
      bidOf: userData?._id,
      ofProject: currentProject ? currentProject : "",
      bidAmount,
    };
    mutate(bidData);
  }

  return (
    <Box
      sx={{ ...DFlex, alignItems: "flex-start", gap: 5, p: 2.5, width: "100%" }}
    >
      <GlobalModal
        headerText={"Make a Bid"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        {/* add-project-form */}
        <Box
          sx={{ ...DFlex, width: "100%", gap: 2.5 }}
          component={"form"}
          onSubmit={HandleAddABid}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            required
            sx={{ width: "100%" }}
            label="Bid Amount"
            name="BidAmount"
            type="number"
          />
          <Button
            disabled={status === "pending"}
            sx={{ width: "100%" }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Add Your Bid
          </Button>
        </Box>
      </GlobalModal>

      <PageHeading
        heading={`Open Projects (${
          allOpenProjects?.length ? allOpenProjects?.length : 0
        })`}
      />

      {/* PROJECTS CONTAINER */}
      <Box sx={{ ...DFlex, gap: 5, width: "100%" }}>
        {/* PROJECT CARD */}
        {allOpenProjects?.map((project: ProjectTypes, index: number) => {
          return (
            <FadeFromSide delay={index / 10}>
              <ProjectCard
                key={project._id}
                project={project}
                setOpenModal={setOpenModal}
                setCurrentProject={setCurrentProject}
              />
            </FadeFromSide>
          );
        })}
      </Box>
    </Box>
  );
}

export default AllProjects;

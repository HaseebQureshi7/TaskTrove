import {
  Box,
  Button,
  SnackbarContent,
  TextField,
  Typography,
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
import Typewriter from "react-ts-typewriter";
import PageHeading from "../../components/PageHeading";

function AllClientProjects() {
  // DISABLE BID BUTTON IF A BID IS ALREADY ADDED.
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const [openModal, setOpenModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | undefined>("");

  const GetAllClientProjects = () => {
    return useAxios.get(`project/viewAllClientsProjects/${userData?._id}`);
  };

  const { data: allClientProjects } = useQuery({
    queryKey: ["allClientProjects"],
    queryFn: GetAllClientProjects,
    select: (data) => {
      return data.data;
    },
  });

  return (
    <Box
      sx={{ ...DFlex, alignItems: "flex-start", gap: 5, p: 2.5, width: "100%" }}
    >
      <PageHeading heading={`Your Projects (${allClientProjects?.length ? allClientProjects?.length : 0})`}/>

      {/* PROJECTS CONTAINER */}
      <Box sx={{ ...DFlex, gap: 5, width: "100%" }}>
        {/* PROJECT CARD */}
        {allClientProjects?.map((project: ProjectTypes, index:number) => {
          return (
            <FadeFromSide delay={index/10}>
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

export default AllClientProjects;

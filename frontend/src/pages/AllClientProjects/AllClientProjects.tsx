import { Box } from "@mui/material";
import DFlex from "./../../styles/Flex";
import ProjectCard from "../../components/ProjectCard";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ProjectTypes from "../../types/ProjectTypes";
import { useContext, useState } from "react";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import UserDataContext from "../../context/UserDataContext";
import { FadeFromSide } from "../../animations/PageTransition";
import PageHeading from "../../components/PageHeading";

function AllClientProjects() {
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  // @ts-ignore
  const [openModal, setOpenModal] = useState(false);
  // @ts-ignore
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
      <PageHeading
        heading={`Your Projects (${
          allClientProjects?.length ? allClientProjects?.length : 0
        })`}
      />

      {/* PROJECTS CONTAINER */}
      <Box sx={{ ...DFlex, gap: 5, width: "100%" }}>
        {/* PROJECT CARD */}
        {allClientProjects?.map((project: ProjectTypes, index: number) => {
          return (
            <FadeFromSide key={project._id} delay={index / 10}>
              <ProjectCard
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

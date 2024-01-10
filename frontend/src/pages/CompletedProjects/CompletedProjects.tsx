import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import UserDataContext from "../../context/UserDataContext";
import useAxios from "../../hooks/useAxios";
import DFlex from "../../styles/Flex";
import ProjectTypes from "../../types/ProjectTypes";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import { FadeFromSide } from "../../animations/PageTransition";
import PageHeading from "../../components/PageHeading";

function CompletedProjects() {
  // DISABLE BID BUTTON IF A BID IS ALREADY ADDED.
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  // @ts-ignore
  const [openModal, setOpenModal] = useState(false);
  // @ts-ignore
  const [currentProject, setCurrentProject] = useState<string | undefined>("");

  const GetAllOpenProjects = () => {
    return useAxios.get(`project/viewAllFreelancersProjects/${userData?._id}`);
  };

  const { data: allOpenProjects } = useQuery({
    queryKey: ["allOpenProjects"],
    queryFn: GetAllOpenProjects,
    select: (data) => {
      return data.data.filter((project: ProjectTypes) => {
        return project?.projectStatus == "Completed";
      });
    },
  });

  return (
    <Box
      sx={{ ...DFlex, alignItems: "flex-start", gap: 5, p: 2.5, width: "100%" }}
    >
      <PageHeading
        heading={`Your Completed Projects (${
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

export default CompletedProjects;

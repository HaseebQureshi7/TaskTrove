import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import DFlex from "./../../styles/Flex";
import { BackHand, FactCheck, FastForward } from "@mui/icons-material";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import UserDataContext from "../../context/UserDataContext";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ProjectTypes from "../../types/ProjectTypes";
import ProjectTable from "../../components/ProjectTable";
import { AnimatedCounter } from "react-animated-counter";
import DarkModeContext from "../../context/DarkModeContext";

function FreelancerStats() {
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  const {themeMode} = useContext(DarkModeContext)

  const GetFreelancersProjects = () => {
    return useAxios.get(`project/viewAllFreelancersProjects/${userData?._id}`);
  };

  const { data: allFreelancersProjects } = useQuery({
    queryKey: ["FreelancerProjects"],
    queryFn: GetFreelancersProjects,
    select: (data) => {
      return data.data;
    },
  });

  const GetAllFreelancersBids = () => {
    return useAxios.get(`bid/allBidsOfFreelancer/${userData?._id}`);
  };

  const { data: allFreelancersBids } = useQuery({
    queryKey: ["AllFreelancersBids"],
    queryFn: GetAllFreelancersBids,
    select: (data) => {
      return data.data;
    },
  });

  const allCompletedProjects = (
    allFreelancersProjects as [ProjectTypes]
  )?.filter((project: ProjectTypes) => project.projectStatus === "Completed");

  const allProjectsInProgress = (
    allFreelancersProjects as [ProjectTypes]
  )?.filter((project: ProjectTypes) => project.projectStatus === "InProgress");

  return (
    <Box
      sx={{
        ...DFlex,
        width: "100%",
        alignItems: "flex-start",
        p: 2.5,
        gap: 2.5,
      }}
    >
      {/* add-proj-button */}
      {/* <Box
        sx={{
          ...DFlex,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Your Statistics (3)</Typography>
      </Box> */}
      {/* stat-container */}
      <Box
        sx={{
          ...DFlex,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: { xs: 2.5, lg: 5 },
        }}
      >
        {/* stat */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "text.primary",
            borderRadius: 2.5,
            p: 0.5,
          }}
        >
          <Box
            sx={{
              ...DFlex,
              py: 2.5,
              gap: 1,
              borderRadius: 2.5,
              border: themeMode === "dark" ? "5px solid black" : "5px solid white",
            }}
          >
            {/* stat-icon */}
            <Box
              sx={{
                ...DFlex,
                flexDirection: { xs: "column", lg: "row" },
                gap: 5,
              }}
            >
              <FactCheck
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={
                    allCompletedProjects?.length
                      ? allCompletedProjects?.length
                      : 0
                  }
                />
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "background.default",
                display: { xs: "none", lg: "inherit" },
              }}
              variant="h6"
            >
              Your Completed Projects
            </Typography>
          </Box>
        </Box>
        {/* stat */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "text.primary",
            borderRadius: 2.5,
            p: 0.5,
          }}
        >
          <Box
            sx={{
              ...DFlex,
              py: 2.5,
              gap: 1,
              borderRadius: 2.5,
              border: themeMode === "dark" ? "5px solid black" : "5px solid white",
            }}
          >
            {/* stat-icon */}
            <Box
              sx={{
                ...DFlex,
                flexDirection: { xs: "column", lg: "row" },
                gap: 5,
              }}
            >
              <FastForward
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
              <AnimatedCounter decimalPrecision={0} fontSize="h3" value={allProjectsInProgress?.length ? allProjectsInProgress?.length : 0} />

              </Typography>
            </Box>
            <Typography
              sx={{
                color: "background.default",
                display: { xs: "none", lg: "inherit" },
              }}
              variant="h6"
            >
              Your Ongoing Projects
            </Typography>
          </Box>
        </Box>
        {/* stat */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "text.primary",
            borderRadius: 2.5,
            p: 0.5,
          }}
        >
          <Box
            sx={{
              ...DFlex,
              py: 2.5,
              gap: 1,
              borderRadius: 2.5,
              border: themeMode === "dark" ? "5px solid black" : "5px solid white",
            }}
          >
            {/* stat-icon */}
            <Box
              sx={{
                ...DFlex,
                flexDirection: { xs: "column", lg: "row" },
                gap: 5,
              }}
            >
              <BackHand
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={
                    allFreelancersBids?.length ? allFreelancersBids?.length : 0
                  }
                />
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "background.default",
                display: { xs: "none", lg: "inherit" },
              }}
              variant="h6"
            >
              Total Bids Added
            </Typography>
          </Box>
        </Box>
      </Box>
      <ProjectTable projects={allFreelancersProjects} />
    </Box>
  );
}

export default FreelancerStats;

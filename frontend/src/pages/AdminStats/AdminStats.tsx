import { FactCheck, People, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AnimatedCounter } from "react-animated-counter";
import ProjectTable from "../../components/ProjectTable";
import useAxios from "../../hooks/useAxios";
import UserTypes from "../../types/UserTypes";
import DFlex from "./../../styles/Flex";
import { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

function AdminStats() {
  const {themeMode} = useContext(DarkModeContext)

  const GetAllProjects = () => {
    return useAxios.get(`project/viewAllProjects`);
  };

  const { data: allProjects } = useQuery({
    queryKey: ["AllProjects"],
    queryFn: GetAllProjects,
    select: (data) => {
      return data.data;
    },
  });

  const GetAllFreelancers = () => {
    return useAxios.get(`user/allFreelancers`);
  };

  const { data: allFreelancers } = useQuery({
    queryKey: ["AllFreelancers"],
    queryFn: GetAllFreelancers,
    select: (data) => {
      return data.data.freelancers;
    },
  });

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
                  value={allProjects?.length ? allProjects?.length : 0}
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
              Projects
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
              <People
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={allFreelancers?.length ? allFreelancers?.length : 0}
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
              Freelancers
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
              <Star
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={
                    allFreelancers?.length
                      ? allFreelancers?.filter((user: UserTypes) => {
                          return !user?.isBlocked;
                        })?.length
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
              Active Freelancers
            </Typography>
          </Box>
        </Box>
      </Box>
      <ProjectTable projects={allProjects} />
    </Box>
  );
}
export default AdminStats;

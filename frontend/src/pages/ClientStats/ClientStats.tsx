import {
  AccessTime,
  Add,
  AttachMoney,
  FactCheck,
  FastForward,
  Info,
  Inventory,
  Title,
} from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DFlex from "./../../styles/Flex";
import GlobalModal from "../../components/ui/Modal";
import { FormEvent, useContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProjectTypes from "../../types/ProjectTypes";
import UserDataContextTypes from "../../types/UserDataContextTypes";
import UserDataContext from "../../context/UserDataContext";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import SnackbarContext from "../../context/SnackbarContext";
import ProjectTable from "../../components/ProjectTable";
import isXSmall from "../../utils/isXSmall";
import { AnimatedCounter } from "react-animated-counter";
import DarkModeContext from "../../context/DarkModeContext";

function ClientStats() {
  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const {themeMode} = useContext(DarkModeContext)

  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const { isXS } = isXSmall();

  const GetClientsProjects = () => {
    return useAxios.get(`project/viewAllClientsProjects/${userData?._id}`);
  };

  const { data: allClientsProjects, status: allClientsProjectsStatus } =
    useQuery({
      queryKey: ["ClientProjects"],
      queryFn: GetClientsProjects,
      select: (data) => {
        return data.data;
      },
    });

  const AddProjectMF = (projectData: ProjectTypes) => {
    return useAxios.post("project/addProject", projectData);
  };

  const { status, mutate } = useMutation({
    mutationFn: AddProjectMF,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ClientProjects"] });
      setOpenModal(false);
      setOpenSnack({
        open: true,
        message: "Project added successfully",
        severity: "success",
      });
    },
  });

  function HandleAddProject(e: FormEvent) {
    e.preventDefault();
    const projectData: ProjectTypes = {
      name: (e.currentTarget as HTMLFormElement).ProjectName.value,
      budget: (e.currentTarget as HTMLFormElement).ProjectBudget.value,
      deadline: (e.currentTarget as HTMLFormElement).ProjectDeadline.value,
      description: (e.currentTarget as HTMLFormElement).ProjectDescription
        .value,
      projectOwner: userData?._id,
    };
    mutate(projectData);
  }

  const allCompletedProjects = (allClientsProjects as [ProjectTypes])?.filter(
    (project: ProjectTypes) => project.projectStatus === "Completed"
  );
  const allProjectsInProgress = (allClientsProjects as [ProjectTypes])?.filter(
    (project: ProjectTypes) => project.projectStatus === "InProgress"
  );
  const allOpenProjects = (allClientsProjects as [ProjectTypes])?.filter(
    (project: ProjectTypes) => project.allotedTo === null
  );

  return (
    <Box
      sx={{
        ...DFlex,
        width: "100%",
        alignItems: "flex-start",
        p: { xs: 1, lg: 2.5 },
        gap: 2.5,
      }}
    >
      <GlobalModal
        headerText={"Add Project"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        {/* add-project-form */}
        <Box
          sx={{ ...DFlex, width: "100%", gap: 2.5 }}
          component={"form"}
          onSubmit={HandleAddProject}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title />
                </InputAdornment>
              ),
            }}
            required
            sx={{ width: "100%" }}
            label="Project Name"
            name="ProjectName"
            type="text"
          />
          <Box sx={{ ...DFlex, flexDirection: "row", width: "100%", gap: 5 }}>
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
              label="Project Budget"
              name="ProjectBudget"
              type="number"
            />
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    in Days
                  </InputAdornment>
                ),
              }}
              sx={{ width: "100%" }}
              label="Project Deadline"
              name="ProjectDeadline"
              type="number"
            />
          </Box>
          <TextField
            required
            multiline
            rows={5}
            sx={{ width: "100%" }}
            label="Project Description"
            name="ProjectDescription"
            type="text"
          />
          <Button
            disabled={status === "pending"}
            sx={{ width: "100%" }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Publish
          </Button>
        </Box>
      </GlobalModal>
      {/* add-proj-button */}
      <Box
        sx={{
          ...DFlex,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={isXS ? "h6" : "h5"}>Your Statistics</Typography>
        <Button
          size={isXS ? "small" : "medium"}
          onClick={() => {
            setOpenModal(!openModal);
          }}
          sx={{ borderRadius: 10, color: "white" }}
          variant="contained"
          color="info"
          startIcon={<Add />}
        >
          Publish a Project
        </Button>
      </Box>
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
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={
                    allProjectsInProgress?.length
                      ? allProjectsInProgress?.length
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
              <Inventory
                sx={{ width: 50, height: 50, color: "background.default" }}
              />
              <Typography sx={{ color: "background.default", filter: themeMode === "light" ? "invert(100)" : "none" }} variant="h3">
                <AnimatedCounter
                  decimalPrecision={0}
                  fontSize="h3"
                  value={allOpenProjects?.length ? allOpenProjects?.length : 0}
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
              Your Open Projects
            </Typography>
          </Box>
        </Box>
      </Box>
      <ProjectTable projects={allClientsProjects} />
    </Box>
  );
}

export default ClientStats;

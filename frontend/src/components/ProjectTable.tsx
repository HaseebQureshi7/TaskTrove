import {
  Message,
  MoreHoriz,
  Payment,
  Radar,
  RemoveCircle,
  Update,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ProjectTypes from "../types/ProjectTypes";
import DFlex from "./../styles/Flex";
import { FormEvent, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import SnackbarContext from "../context/SnackbarContext";
import UserDataContext from "../context/UserDataContext";
import UserDataContextTypes from "../types/UserDataContextTypes";
import GlobalModal from "./ui/Modal";
import { useNavigate } from "react-router-dom";
import DaysLeft from "./../utils/DaysLeft";

interface ProjectTableProps {
  projects: Array<ProjectTypes> | undefined;
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  const { userData }: UserDataContextTypes = useContext(UserDataContext);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState<ProjectTypes>();
  const [projectStatus, setProjectStatus] = useState<
    "Incomplete" | "InProgress" | "Completed"
  >();

  const EditProjectMF = (ProjectData: ProjectTypes) => {
    return useAxios.put(
      `/project/editProject/${selectedProject?._id}`,
      ProjectData
    );
  };

  const { status: editProjectStatus, mutate: EditProjectMutation } =
    useMutation({
      mutationFn: EditProjectMF,
      onSuccess: (data) => {
        setOpenModal(!openModal);
        QueryClient.invalidateQueries({ queryKey: ["FreelancerProjects"] });
        setOpenSnack({
          open: true,
          message: `The status was changed.`,
          severity: "info",
        });
      },
    });

  async function GetUserEmail(project: ProjectTypes) {
    await useAxios
      .get(
        userData?.role === "client"
          ? `user/getUserById/${project?.allotedTo}`
          : `user/getUserById/${project?.projectOwner}`
      )
      .then((res) =>
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${res.data.email}`,
          "_blank"
        )
      )
      .catch((err) => console.log(err));
  }

  function HandleEditProject(e: FormEvent) {
    e.preventDefault();
    const today = Date.now();
    const ProjectData: any = {
      projectStatus,
      completionDate: today,
    };
    EditProjectMutation(ProjectData as ProjectTypes);
  }

  const RemoveProjectMF = () => {
    return useAxios.delete(`/project/removeProject/${selectedProject?._id}`);
  };

  const { status: rmProjStatus, mutate: RemoveProjectMutatation } = useMutation(
    {
      mutationFn: RemoveProjectMF,
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: ["AllProjects"] });
        QueryClient.invalidateQueries({ queryKey: ["ClientProjects"] });
        QueryClient.invalidateQueries({ queryKey: ["allClientProjects"] });
        setOpenSnack({
          open: true,
          message: `The project was removed! 🎉`,
          severity: "info",
        });
      },
    }
  );

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const HandleRemoveProject = () => {
    RemoveProjectMutatation();
  };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setProjectStatus(selectedProject?.projectStatus);
  }, [selectedProject]);

  if (projects) {
    return (
      <TableContainer
        sx={{ p: 2.5, border: "2.5px solid white" }}
        component={Paper}
      >
        <Typography sx={{ fontWeight: 500 }} variant="h5" color="text.primary">
          Projects ({projects.length})
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="left">Budget</TableCell>
              <TableCell align="left">Deadline</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project: ProjectTypes | null) => (
              <TableRow key={project?._id}>
                <TableCell component="th" scope="row">
                  {project?.name}
                </TableCell>
                <TableCell align="left">${project?.budget}</TableCell>
                <TableCell align="left">
                  {(userData?.role === "freelancer" ||
                    userData?.role === "client") &&
                  project?.acceptedBid != null
                    ? `${DaysLeft(
                        project?.allotmentDate as string,
                        project?.deadline as number
                      )} of ${project?.deadline} days left`
                    : `${project?.deadline} days`}
                </TableCell>
                <TableCell align="left">
                  {project?.projectStatus}
                  {!project?.paymentReceived &&
                    project?.projectStatus === "Completed" &&
                    "(Payment Pending)"}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "15px",
                    }}
                  >
                    <MoreHoriz
                      onClick={(e) => {
                        handleMenuClick(e);
                        setSelectedProject(project as ProjectTypes);
                      }}
                      sx={{ color: "text.secondary", cursor: "pointer" }}
                    />
                  </Box>
                  {/* Options Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                  >
                    {(userData?.role === "admin" ||
                      userData?.role === "client") && (
                      <MenuItem
                        sx={{
                          ...DFlex,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          px: 2.5,
                          gap: 2.5,
                        }}
                        onClick={() => HandleRemoveProject()}
                      >
                        <RemoveCircle sx={{ color: "red" }} />
                        <Typography
                          sx={{
                            color: "red",
                            fontWeight: 500,
                          }}
                        >
                          Remove Project
                        </Typography>
                      </MenuItem>
                    )}
                    {userData?.role === "freelancer" &&
                      !selectedProject?.paymentReceived && (
                        <MenuItem
                          sx={{
                            ...DFlex,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            px: 2.5,
                            gap: 2.5,
                          }}
                          onClick={() => setOpenModal(!openModal)}
                        >
                          <Update sx={{ color: "cyan" }} />
                          <Typography
                            sx={{
                              color: "cyan",
                            }}
                          >
                            Update Project Status
                          </Typography>
                        </MenuItem>
                      )}
                    {userData?.role === "client" &&
                      selectedProject?.projectStatus === "Completed" &&
                      !selectedProject?.paymentReceived && (
                        <MenuItem
                          sx={{
                            ...DFlex,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            px: 2.5,
                            gap: 2.5,
                          }}
                          onClick={() =>
                            navigate("payment", {
                              state: { project: selectedProject },
                            })
                          }
                        >
                          <Payment sx={{ color: "success" }} />
                          <Typography
                            sx={{
                              color: "#FFF",
                            }}
                          >
                            Complete Payment
                          </Typography>
                        </MenuItem>
                      )}
                    {(userData?.role === "client" ||
                      userData?.role === "freelancer") && (
                      <MenuItem
                        onClick={async () => {
                          // window.location.href = `mailto:${EmailData?.data?.email}`
                          GetUserEmail(selectedProject as ProjectTypes);
                        }}
                        sx={{
                          ...DFlex,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          px: 2.5,
                          gap: 2.5,
                        }}
                      >
                        <Message sx={{ color: "#5A99F6" }} />
                        <Typography
                          sx={{
                            color: "#5A99F6",
                          }}
                        >
                          Message{" "}
                          {userData?.role === "client"
                            ? "Freelancer"
                            : "Client"}
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <GlobalModal
          headerText={"Update Project Status"}
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          {/* add-project-form */}
          <Box
            sx={{ ...DFlex, width: "100%", gap: 2.5, alignItems: "flex-start" }}
            component={"form"}
            onSubmit={HandleEditProject}
          >
            <Select
              IconComponent={() => <Radar sx={{ mr: 2 }} />}
              sx={{ width: "50%" }}
              value={projectStatus}
              label="Project Status"
              defaultValue={"InProgress"}
              onChange={(e: any) => setProjectStatus(e.target.value)}
            >
              <MenuItem value={"InProgress"}>In Progress</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
            <Button
              disabled={editProjectStatus === "pending"}
              sx={{ width: "100%" }}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Update Project Status
            </Button>
          </Box>
        </GlobalModal>
      </TableContainer>
    );
  } else {
    return (
      // <Skeleton sx={{ width: "100%", height: "50vh", }} />
      <Box sx={{ ...DFlex, width: "100%", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }
}

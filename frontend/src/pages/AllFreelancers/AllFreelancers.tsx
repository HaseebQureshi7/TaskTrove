import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import DFlex from "./../../styles/Flex";
import { Block, ControlPointDuplicate, MoreHoriz } from "@mui/icons-material";
import UserTypes from "../../types/UserTypes";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";
import SnackbarContext from "../../context/SnackbarContext";
import PageHeading from "../../components/PageHeading";

function AllFreelancers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState<UserTypes>();
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const queryClient = useQueryClient();

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

  const handleMenuClick = (event: any, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const BlockFreelancerMF = () => {
    return useAxios.post(`user/blockUser/${selectedUser?._id}`);
  };

  const UnblockFreelancerMF = () => {
    return useAxios.post(`user/unblockUser/${selectedUser?._id}`);
  };

  const { status, mutate } = useMutation({
    mutationFn: selectedUser?.isBlocked
      ? UnblockFreelancerMF
      : BlockFreelancerMF,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllFreelancers"] });
      setOpenSnack({
        open: true,
        message: !selectedUser?.isBlocked ? "Freelancer was blocked!" : "Freelancer was unblocked!",
        severity: "info",
      });
    },
  });

  const handleBlockUser = () => {
    mutate();
    handleMenuClose();
  };

  return (
    <Box
      sx={{ ...DFlex, alignItems: "flex-start", gap: 5, p: 2.5, width: "100%" }}
    >
      <PageHeading heading={`All Freelancers (${allFreelancers?.length ? allFreelancers?.length : 0})`}/>

      {/* FREELANCERS CONTAINER */}
      <Box sx={{ ...DFlex, gap: 5, width: "100%" }}>
        <TableContainer sx={{ p: 2.5 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Member Since</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFreelancers?.map((freelancer: UserTypes) => (
                <TableRow key={freelancer._id}>
                  <TableCell component="th" scope="row">
                    {freelancer.name}
                  </TableCell>
                  <TableCell align="left">{freelancer.email}</TableCell>
                  <TableCell align="left">
                    {new Date(freelancer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: !freelancer.isBlocked ? "green" : "red",
                      fontWeight: 500,
                    }}
                    align="left"
                  >
                    {freelancer.isBlocked ? "Blocked" : "Active"}
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
                        sx={{ color: "text.secondary", cursor: "pointer" }}
                        onClick={(e) => handleMenuClick(e, freelancer)}
                      />
                    </Box>
                    {/* Options Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      onClick={handleMenuClose}
                    >
                      {freelancer?.isBlocked ? (
                        <MenuItem
                          sx={{
                            ...DFlex,
                            width: "100%",
                            flexDirection: "row",
                            px: 2.5,
                            gap: 2.5,
                          }}
                          onClick={handleBlockUser}
                        >
                          <ControlPointDuplicate sx={{ color: "green" }} />
                          <Typography sx={{ color: "green" }}>
                            Unblock User
                          </Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          sx={{
                            ...DFlex,
                            width: "100%",
                            flexDirection: "row",
                            px: 2.5,
                            gap: 2.5,
                          }}
                          onClick={handleBlockUser}
                        >
                          <Block sx={{ color: "red" }} />
                          <Typography
                            sx={{
                              color: status !== "pending" ? "red" : "grey",
                            }}
                          >
                            Block User
                          </Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AllFreelancers;

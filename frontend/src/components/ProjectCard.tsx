import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Typewriter from "react-ts-typewriter";
import { FadeFromSide, FadeIn } from "../animations/PageTransition";
import SnackbarContext from "../context/SnackbarContext";
import UserDataContext from "../context/UserDataContext";
import useAxios from "../hooks/useAxios";
import BidTypes from "../types/BidTypes";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import UserDataContextTypes from "../types/UserDataContextTypes";
import DateFormatter from "../utils/DateFormatter";
import isXSmall from "../utils/isXSmall";
import DFlex from "./../styles/Flex";
import GlobalModal from "./ui/Modal";
import ProjectCardTypes from "../types/ProjectCardPropTypes";

function ProjectCard({
  project,
  setOpenModal,
  setCurrentProject,
}: ProjectCardTypes) {
  const location = useLocation();
  const QueryClient = useQueryClient();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { userData }: UserDataContextTypes = useContext(UserDataContext);

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState<string | undefined>("");
  const [rating, setRatings] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const { isXS } = isXSmall();

  const GetProjectRatings = () => {
    return useAxios.get(`review/reviewsByProjectId/${project?._id}`);
  };

  const { data: hasRatings } = useQuery({
    queryKey: [`Rating of ${project?._id}`],
    queryFn: GetProjectRatings,
  });

  const GetAllBidsOnProject = () => {
    return useAxios.get(`bid/allBidsOnProject/${project?._id}`);
  };

  const { data: AllBidsOnProject } = useQuery({
    queryKey: ["AllBidsOn-" + project?._id],
    queryFn: GetAllBidsOnProject,
    select: (data) => {
      return data.data;
    },
  });

  const AcceptBid = () => {
    return useAxios.post(`bid/acceptBid/${selectedBid}`);
  };

  const { status, mutate } = useMutation({
    mutationFn: AcceptBid,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["allClientProjects"] });
      setOpenSnack({
        open: true,
        message: `The bid was accepted! 🎉`,
        severity: "success",
      });
    },
  });

  const MakeReviewMF = (ReviewData: any) => {
    return useAxios.post(`/review/addReview`, ReviewData);
  };

  const { status: MakeReviewStatus, mutate: MakeReviewMutation } = useMutation({
    mutationFn: MakeReviewMF,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["AllProjects"] });
      QueryClient.invalidateQueries({ queryKey: ["ClientProjects"] });
      QueryClient.invalidateQueries({ queryKey: ["allClientProjects"] });
      setOpenReviewModal(false);
      setOpenSnack({
        open: true,
        message: `Project Rated Successfully.`,
        severity: "info",
      });
    },
  });

  function HandleMakeReview(e: FormEvent) {
    e.preventDefault();
    const reviewData: any = {
      reviewOfProject: project?._id,
      reviewBy: project?.projectOwner,
      rating,
      review,
    };
    MakeReviewMutation(reviewData);
  }

  const RemoveProject = () => {
    return useAxios.delete(`/project/removeProject/${project?._id}`);
  };

  const { mutate: RemoveProjectMutatation } = useMutation({
    mutationFn: RemoveProject,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["allOpenProjects"] });
      setOpenSnack({
        open: true,
        message: `The project was removed! 🎉`,
        severity: "info",
      });
    },
  });

  function HandleAcceptBid(e: FormEvent) {
    e.preventDefault();
    mutate();
  }

  function HandleRemoveProject(e: FormEvent) {
    e.preventDefault();
    RemoveProjectMutatation();
  }

  const isContentAvailable =
    (project?.allotedTo == null &&
      (location.pathname.includes("/client/") ||
        location.pathname.includes("/admin/"))) ||
    (project?.projectStatus === "Completed" &&
      hasRatings?.data?.length === 0) ||
    hasRatings?.data?.length > 0;

  return (
    <Box
      key={project._id}
      sx={{
        ...DFlex,
        width: "100%",
        border: "2px solid white",
        borderRadius: 2,
        p: 2.5,
        gap: 5,
      }}
    >
      {/* top-row */}
      <Box
        sx={{
          ...DFlex,
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          alignItems: { xs: "flex-start", lg: "center" },
          gap: { xs: 2.5, lg: 0 },
          justifyContent: "space-between",
          color: "text.primary",
          backgroundColor: "background.default",
        }}
      >
        <Typography sx={{}} variant={isXS ? "h4" : "h5"}>
          {project?.name}
        </Typography>
        <Typography
          sx={{ color: "text.primary", fontWeight: 500 }}
          variant="h5"
        >
          <span style={{ color: "grey", fontSize: "smaller", fontWeight: 400 }}>
            deliver in:{" "}
          </span>
          {project?.deadline} Days
        </Typography>
        <Typography
          sx={{ color: "text.primary", fontWeight: 500 }}
          variant="h5"
        >
          <span style={{ color: "grey", fontSize: "smaller", fontWeight: 400 }}>
            budget:{" "}
          </span>
          ${project?.budget}
        </Typography>
      </Box>
      {/* middle-row */}
      <Box
        sx={{
          ...DFlex,
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          justifyContent: "space-between",
          color: "text.primary",
          alignItems: { xs: "center", lg: "center" },
          gap: { xs: 2.5, lg: 0 },
          backgroundColor: "background.default",
          pb: isContentAvailable ? 2 : 0,
          borderBottom: isContentAvailable ? "2px solid lightgrey" : "none",
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            textAlign: { xs: "center", lg: "start" },
          }}
          variant="body1"
        >
          <span style={{ color: "grey" }}>Description: </span>
          {project?.description}
        </Typography>
        {location.pathname.includes("/admin/") ? (
          <Button
            onClick={HandleRemoveProject}
            sx={{ borderRadius: 5, px: 5 }}
            variant="contained"
            size="small"
          >
            Remove Project
          </Button>
        ) : location.pathname.includes("/freelancer/") &&
          project?.projectStatus !== "Completed" ? (
          <Button
            size="small"
            onClick={() => {
              setOpenModal && setOpenModal(true);
              setCurrentProject && setCurrentProject(project?._id);
            }}
            sx={{ borderRadius: 5, px: 5 }}
            variant="contained"
          >
            Make a Bid
          </Button>
        ) : null}
      </Box>

      {/* bottom-row */}
      {isContentAvailable && (
        <Box
          sx={{
            ...DFlex,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            color: "text.primary",
            backgroundColor: "background.default",
          }}
        >
          <Box
            sx={{
              ...DFlex,
              flexDirection: "row",
              width: "100%",
              borderRadius: 2,
              transition: "all 1s ease",
            }}
          >
            {project?.allotedTo == null ? (
              (location.pathname.includes("/client/") ||
                location.pathname.includes("/admin/")) && (
                <FadeIn>
                  <Accordion sx={{ width: "100%", border: "2px solid white" }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>
                        Open Bids ({AllBidsOnProject?.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ ...DFlex, width: "100%", gap: 2.5 }}
                    >
                      {AllBidsOnProject?.map((bid: BidTypes) => {
                        return (
                          <Box
                            key={bid._id}
                            sx={{
                              ...DFlex,
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between",
                              gap: 5,
                            }}
                          >
                            <Typography
                              sx={{ color: "text.primary" }}
                              variant="body1"
                            >
                              <span style={{ color: "grey" }}>Added at: </span>
                              {DateFormatter(bid?.createdAt as string)}
                            </Typography>
                            <Typography
                              sx={{ color: "text.primary" }}
                              variant="h6"
                            >
                              ${bid?.bidAmount}
                            </Typography>
                            <Button
                              onClick={(e) => {
                                HandleAcceptBid(e);
                                setSelectedBid(bid._id);
                              }}
                              disabled={
                                status === "pending" ||
                                userData?.role === "admin"
                              }
                              sx={{ borderRadius: 10, color: "text.primary" }}
                              variant="contained"
                              color="info"
                            >
                              Accept this Bid
                            </Button>
                          </Box>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </FadeIn>
              )
            ) : userData?.role !== "freelancer" &&
              project?.projectStatus === "Completed" &&
              hasRatings?.data?.length == 0 ? (
              <Button
                onClick={() => {
                  setOpenReviewModal(!openReviewModal);
                }}
                sx={{ width: "100%", fontWeight: 600 }}
              >
                Add a review
              </Button>
            ) : hasRatings?.data?.length > 0 ? (
              <FadeFromSide duration={0.25} delay={0.25}>
                <Box sx={{ ...DFlex, width: "100%", gap: 2.5 }}>
                  <Box
                    sx={{
                      ...DFlex,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ color: "text.primary" }} variant="body1">
                      <span style={{ color: "grey" }}>Delivered on: </span>
                      {DateFormatter(project?.completionDate as string)}
                    </Typography>
                    <Rating
                      sx={{ color: "secondary.main" }}
                      value={hasRatings?.data[0].rating}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "70%",
                      alignSelf: "self-start",
                    }}
                    variant="body1"
                  >
                    <span style={{ color: "grey" }}>Client says: </span>
                    {hasRatings?.data[0].review}
                  </Typography>
                </Box>
              </FadeFromSide>
            ) : (
              <Typography
                sx={{ width: "100%", fontWeight: 500, textAlign: "center" }}
                variant="h6"
              >
                <Typewriter text={"Project in Progress "} />
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {/* add review modal */}
      <GlobalModal
        headerText={"Write a Review"}
        openModal={openReviewModal}
        setOpenModal={setOpenReviewModal}
      >
        {/* add-review-form */}
        <Box
          sx={{ ...DFlex, width: "100%", gap: 2.5, alignItems: "flex-start" }}
          component={"form"}
          onSubmit={HandleMakeReview}
        >
          <Box
            sx={{
              ...DFlex,
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              gap: 5,
            }}
          >
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Tap to Rate
            </Typography>
            <Rating
              size="large"
              onChange={(e: any) => setRatings(e.target.value)}
            />
          </Box>
          <TextField
            multiline
            rows={5}
            onChange={(e) => setReview(e.target.value)}
            required
            sx={{ width: "100%" }}
            label="Talk about your experience"
            type="text"
          />
          <Button
            disabled={MakeReviewStatus === "pending"}
            sx={{ width: "100%" }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Publish Review
          </Button>
        </Box>
      </GlobalModal>
    </Box>
  );
}

export default ProjectCard;

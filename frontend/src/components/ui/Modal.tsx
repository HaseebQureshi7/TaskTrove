import { Clear } from "@mui/icons-material";
import { Box, Divider, Modal, Typography } from "@mui/material";
import isXSmall from "../../utils/isXSmall";
import DFlex from "./../../styles/Flex";
import { ReactNode } from "react";

type ModalPropTypes = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  headerText: String;
  children: ReactNode;
};

export default function GlobalModal({
  openModal = false,
  setOpenModal,
  headerText,
  children,
}: ModalPropTypes) {
  const { isXS } = isXSmall();
  return (
    <>
      <Modal
        sx={{ ...DFlex, width: "100%", height: "100%" }}
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <Box
          sx={{
            ...DFlex,
            p: { xs: 1, lg: 2.5 },
            height: "auto",
            width: { xs: "100%", lg: "75%" },
            borderRadius: "5px",
            gap: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "background.default",
          }}
        >
          {/* MODAL HEADER */}
          <Box
            sx={{
              ...DFlex,
              width:"100%",
              flexDirection: "row",
              justifyContent: "space-between",
              p: 1,
              pr: { xs: 1, lg: 2.5 },
            }}
          >
            <Typography
              color="text.primary"
              fontWeight={400}
              variant={isXS ? "h5" : "h4"}
            >
              {headerText}
            </Typography>
            <Clear
              sx={{ cursor: "pointer", color: "text.primary" }}
              onClick={() => setOpenModal(!openModal)}
              fontSize={"large"}
            />
          </Box>
          <Divider sx={{ width: "100%" }} />
          {/* MODAL BODY */}
          <>{children}</>
        </Box>
      </Modal>
    </>
  );
}

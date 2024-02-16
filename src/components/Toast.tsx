"use client";

import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import { Button, IconButton, Alert } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const Toast = ({
  open,
  message,
  type,
}: {
  open: boolean;
  message: string;
  type: "success" | "error" | undefined;
}) => {
  const [openToast, setOpenToast] = useState(true);

  const handleClose = () => {
    setOpenToast(false);
  };

  useEffect(() => {
    if (message && openToast === false) {
      setOpenToast(true);
    }
  }, [message]);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  {
    console.log("openToast: ", openToast);
  }
  return (
    <Snackbar
      open={openToast}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

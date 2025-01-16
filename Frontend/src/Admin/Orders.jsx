/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React from "react";

function Orders() {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">Total orders</Typography>
    </Box>
  );
}

export default Orders;

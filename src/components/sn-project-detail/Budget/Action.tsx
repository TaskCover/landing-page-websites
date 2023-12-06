"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import AddBudget from "components/sn-project-detail/Budget/Actions/AddBudget";
import Search from "components/sn-project-detail/Budget/Actions/Search";

const Action = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={3}
      py={{ xs: 1.5, md: 1, lg: 1.5 }}
      px={{ xs: 0, md: 3 }}
      display={{ xs: "none", md: "flex" }}
    >
      <AddBudget />
      <Search />
    </Stack>
  );
};

export default memo(Action);

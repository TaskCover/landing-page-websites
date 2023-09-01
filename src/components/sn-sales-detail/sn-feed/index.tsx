import { Stack } from "@mui/material";
import React from "react";
import TodoList from "../components/TodoList";
import CommentSection from "../components/Comment";

const SaleFeed = () => {
  return (
    <Stack>
      <TodoList />
      <CommentSection />
    </Stack>
  );
};

export default SaleFeed;

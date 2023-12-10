import { Stack } from "@mui/material";
import { memo } from "react";
import CommentSection from "../components/Comment";
import { Text } from "components/shared";

type TabProps = {
  title: string;
};
const TabFeed = (props: TabProps) => {
  const { title } = props;
  return (
    <Stack gap={4}>
      {/* <TodoList /> */}
      <Text variant={"body1"}>Write your comment</Text>
      <CommentSection />
    </Stack>
  );
};
export default memo(TabFeed);

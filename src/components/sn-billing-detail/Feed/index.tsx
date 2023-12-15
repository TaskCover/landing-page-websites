import { Stack } from "@mui/material";
import { memo } from "react";
import CommentSection from "../components/Comment";
import { Text } from "components/shared";
import { Billing } from "store/billing/reducer";
import { User } from "constant/types";

type TabProps = {
  title: string;
  bill: Billing;
  user: User;
};
const TabFeed = (props: TabProps) => {
  const { title, bill, user } = props;
  return (
    <Stack gap={4}>
      {/* <TodoList /> */}
      <Text variant={"body1"}>Write your comment</Text>
      <CommentSection billing={bill} user={user} />
    </Stack>
  );
};
export default memo(TabFeed);

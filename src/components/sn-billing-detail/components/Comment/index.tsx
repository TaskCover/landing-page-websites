import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import CommentEditor from "./CommentEditor";
import Comments from "./Comments";
import { Text } from "components/shared";
import { NS_BILLING, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { Billing } from "store/billing/reducer";
import { User } from "constant/types";
import { useBillings } from "store/billing/selectors";

type IProps = {
  billing: Billing;
  user: User;
};
const CommentSection = (props: IProps) => {
  const { billing, user } = props;
  const billingT = useTranslations(NS_BILLING);
  const { onGetCommentBilling, dataComment } = useBillings();

  useEffect(() => {
    onGetCommentBilling(billing?.id ?? "");
  }, [billing]);

  return (
    <Stack>
      <Text color="text.main" mb={3} variant="h5" textTransform="uppercase">
        {"Write your comment"}
      </Text>
      <CommentEditor billing={billing} user={user} />
      <Comments comments={dataComment} />
    </Stack>
  );
};

export default CommentSection;

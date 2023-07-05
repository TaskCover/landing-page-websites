import { memo } from "react";
import {
  CircularProgress,
  Dialog,
  DialogProps,
  Stack,
  dialogClasses,
} from "@mui/material";
import { Text } from "./shared";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";

const Loading = (props: DialogProps) => {
  const t = useTranslations(NS_COMMON);
  const { children, ...rest } = props;
  return (
    <Dialog
      sx={{
        [`& .${dialogClasses.paper}`]: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      {...rest}
    >
      <Stack alignItems="center" spacing={1}>
        <CircularProgress size={24} color="primary" />
        <Text variant="body2" fontWeight={600} color="text.primary">
          {`${t("processing")}...`}
        </Text>
        {children}
      </Stack>
    </Dialog>
  );
};

export default memo(Loading);

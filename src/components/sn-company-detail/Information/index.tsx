"use client";

import { memo } from "react";
import { Divider, Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { formatDate, formatNumber } from "utils/index";
import EditCompany from "./EditCompany";
import { useCompany } from "store/company/selectors";
import { useAuth } from "store/app/selectors";
import StatusServer from "components/StatusServer";
import { useParams } from "next/navigation";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const InformationProjectPage = () => {
  const { user } = useAuth();
  const { item, error, isFetching } = useCompany();
  const { id } = useParams();

  return (
    <StatusServer isFetching={isFetching} error={error} noData={!item}>
      <Stack p={{ xs: 1, sm: 3 }} spacing={3}>
        <Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Text variant="h4">{item?.name ?? "--"}</Text>
            <EditCompany id={id ?? user?.id} />
          </Stack>
          <Text
            variant="h6"
            color="grey.400"
          >{`Tax code: ${item?.tax_code}`}</Text>
        </Stack>
        <Stack spacing={3} width="fit-content">
          <Divider sx={{ borderColor: "grey.100" }} />
          <Text variant="h5">General information</Text>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Owner of Company"></InformationItem>

            <InformationItem label="Owner email"></InformationItem>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Phone number"></InformationItem>

            <InformationItem label="Address"></InformationItem>
          </Stack>
          <Divider sx={{ borderColor: "grey.100" }} />
          <Text variant="h5">Detail Information</Text>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Number of employees">
              {formatNumber(item?.number_of_user)}
            </InformationItem>

            <InformationItem label="Number of positions">
              {formatNumber()}
            </InformationItem>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Number of projects">
              {formatNumber()}
            </InformationItem>

            <InformationItem label="Time create">
              {formatDate(item?.created_time, undefined, "--")}
            </InformationItem>
          </Stack>
        </Stack>
      </Stack>
    </StatusServer>
  );
};

export default memo(InformationProjectPage);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", ...rest } = props;
  return (
    <Stack spacing={0.5} {...rest}>
      <Text color="grey.400" variant="caption" width={130}>
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text variant="body2">{children}</Text>
      ) : (
        children
      )}
    </Stack>
  );
};

"use client";

import { memo, useMemo } from "react";
import { Divider, Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { formatDate, formatNumber } from "utils/index";
import EditCompany from "./EditCompany";
import { useMyCompany } from "store/company/selectors";
import StatusServer from "components/StatusServer";
import { useParams } from "next/navigation";
import { useHeaderConfig } from "store/app/selectors";
import { useCompany } from "store/manager/selectors";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const InformationProjectPage = () => {
  const {
    item: detailItem,
    error: detailItemError,
    isFetching: detailItemIsFetching,
  } = useCompany();
  const {
    item: myItem,
    error: myItemError,
    isFetching: myItemIsFetching,
  } = useMyCompany();
  const { id } = useParams();

  const { prevPath, title } = useHeaderConfig();

  const [item, error, isFetching] = useMemo(() => {
    if (id) {
      return [detailItem, detailItemError, detailItemIsFetching];
    }
    return [myItem, myItemError, myItemIsFetching];
  }, [
    detailItem,
    detailItemError,
    detailItemIsFetching,
    id,
    myItem,
    myItemError,
    myItemIsFetching,
  ]);

  return (
    <StatusServer isFetching={isFetching} error={error} noData={!item}>
      <Stack px={{ xs: 1, sm: 3 }} pb={3} pt={id ? 0 : 3} spacing={3}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack>
            <Text variant="h4">{item?.name ?? "--"}</Text>
            <Text
              variant="h6"
              color="grey.400"
            >{`Tax code: ${item?.tax_code}`}</Text>
          </Stack>

          <EditCompany />
        </Stack>
        <Stack spacing={3} width={{ xs: "fit-content", md: 600 }}>
          <Divider sx={{ borderColor: "grey.100" }} />
          <Text variant="h5">General information</Text>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Owner of Company">
              {item?.owner?.fullname}
            </InformationItem>

            <InformationItem label="Owner email">
              {item?.owner?.email}
            </InformationItem>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Phone number">
              {item?.phone}
            </InformationItem>

            <InformationItem label="Address">{item?.address}</InformationItem>
          </Stack>
          <Divider sx={{ borderColor: "grey.100" }} />
          <Text variant="h5">Detail Information</Text>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Number of employees">
              {formatNumber(item?.total_member)}
            </InformationItem>

            <InformationItem label="Number of positions">
              {formatNumber(item?.total_position)}
            </InformationItem>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, sm: 5, lg: 10 }}
          >
            <InformationItem label="Number of projects">
              {formatNumber(item?.total_project)}
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

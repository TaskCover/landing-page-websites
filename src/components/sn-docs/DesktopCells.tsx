/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import { BodyCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH } from "constant/index";
import { formatDate, formatNumber } from "utils/index";
import { Position } from "store/company/reducer";
import { Text } from "components/shared";
import Avatar from "components/Avatar";
import { Stack, TableRow } from "@mui/material";
import Link from "next/link";

type DesktopCellsProps = {
  item: any;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item } = props;
  return (
    <TableRow>
      <BodyCell align="left">
        <Link href={`/documents/${item.id}`}>
          <Text fontWeight={600} fontSize={14}>
            {item?.name}
          </Text>
        </Link>
      </BodyCell>
      <BodyCell tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}>
        {formatDate(item.created_time)}
      </BodyCell>
      <BodyCell>{formatDate(item.updated_time)}</BodyCell>
      <BodyCell sx={{ py: "10px" }} align="center">
        {item?.created_by?.id ? (
          <Stack
            justifyContent={"center"}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Avatar size={32} src={item.created_by?.avatar?.link} />
            <Stack
              justifyContent={"start"}
              alignItems={"start"}
              direction={"column"}
            >
              <Text fontWeight={600} fontSize={14}>
                {item.created_by?.fullname}
              </Text>
              <Text fontWeight={400} fontSize={14}>
                {item?.created_by?.position?.name}
              </Text>
            </Stack>
          </Stack>
        ) : null}
      </BodyCell>
    </TableRow>
  );
};

export default memo(DesktopCells);

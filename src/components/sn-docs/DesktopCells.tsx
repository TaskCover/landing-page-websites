/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import { BodyCell } from "components/Table";
import {
  DATE_TIME_FORMAT_HYPHEN,
  DATE_TIME_FORMAT_SLASH,
} from "constant/index";
import { formatDate, formatNumber } from "utils/index";
import { Position } from "store/company/reducer";
import { Text } from "components/shared";
import Avatar from "components/Avatar";
import { Stack, TableRow } from "@mui/material";
import Link from "next/link";

type DesktopCellsProps = {
  item: any;
};

function formatTime(dateTimeString) {
  const time: any = new Date(dateTimeString);
  const currentTime: any = new Date();
  const timeDifference: any = currentTime - time;
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    const formattedHours = time.getHours().toString().padStart(2, "0");
    const formattedMinutes = time.getMinutes().toString().padStart(2, "0");
    const formattedDay = time.getDate().toString().padStart(2, "0");
    const formattedMonth = (time.getMonth() + 1).toString().padStart(2, "0");
    const formattedYear = time.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${formattedDay}-${formattedMonth}-${formattedYear}`;
  }
}

const DesktopCells = (props: DesktopCellsProps) => {
  const { item } = props;

  return (
    <>
      <BodyCell align="left">
        <Link href={`/documents/${item.id}`}>
          <Text fontWeight={600} fontSize={14}>
            {item?.name}
          </Text>
        </Link>
      </BodyCell>
      <BodyCell>
        {formatDate(item.created_time, DATE_TIME_FORMAT_HYPHEN)}
      </BodyCell>
      <BodyCell>{formatTime(item.updated_time)}</BodyCell>
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
    </>
  );
};

export default memo(DesktopCells);

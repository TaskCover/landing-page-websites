import Avatar from "components/Avatar";
import { BodyCell } from "components/Table";
import { formatDate } from "utils/index";
import { memo } from "react";
import { Position } from "store/company/reducer";
import { Stack, TableRow } from "@mui/material";
import { Text } from "components/shared";
import Link from "next/link";

type MobileContentCellProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
};

const MobileContentCell = (props: MobileContentCellProps) => {
  const { item } = props;
  return (
    <TableRow>
      <BodyCell align="left" sx={{ px: "10px" }}>
        <Link href={`/documents/${item.id}`}>
          <Text fontWeight={600} fontSize={12}>
            {item?.name}
          </Text>
        </Link>
      </BodyCell>
      <BodyCell>
        <Text fontWeight={400} fontSize={12}>
          {formatDate(item.created_time)}
        </Text>
      </BodyCell>
      <BodyCell>
        <Text fontWeight={600} fontSize={12}>
          {formatDate(item.updated_time)}
        </Text>
      </BodyCell>
      <BodyCell sx={{ py: "10px" }} align="center">
        {item?.created_by?.id ? (
          <Stack
            justifyContent={"center"}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Avatar size={24} src={item.created_by?.avatar?.link} />
            <Stack
              justifyContent={"start"}
              alignItems={"start"}
              direction={"column"}
            >
              <Text fontWeight={600} fontSize={12}>
                {item.created_by?.fullname}
              </Text>
              <Text fontWeight={400} fontSize={12}>
                {item?.created_by?.position?.name}
              </Text>
            </Stack>
          </Stack>
        ) : null}
      </BodyCell>
    </TableRow>
  );
};

export default memo(MobileContentCell);

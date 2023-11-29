/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TableRow,
} from "@mui/material";
import Avatar from "components/Avatar";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import { DATE_TIME_FORMAT_HYPHEN } from "constant/index";
import useTheme from "hooks/useTheme";
import { memo } from "react";
import { formatDate } from "utils/index";

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
  const { isDarkMode } = useTheme();

  return (
    <BodyCell align="left" padding="none" colSpan={4}>
      <StyledAccordion defaultExpanded={true}>
        <AccordionSummary
          sx={{ bgcolor: isDarkMode ? "grey.50" : "primary.light" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Text fontWeight={600} fontSize={14}>
            {item?.name}
          </Text>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          {Array.isArray(item.documents) &&
            item.documents.map((doc) => (
              <TableRow>
                <BodyCell align="left">{doc?.name}</BodyCell>
                <BodyCell>
                  {formatDate(doc.created_time, DATE_TIME_FORMAT_HYPHEN)}
                </BodyCell>
                <BodyCell>{formatTime(doc.updated_time)}</BodyCell>
                <BodyCell sx={{ py: "10px" }} align="center">
                  {doc?.created_by?.id ? (
                    <Stack
                      // justifyContent={"center"}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Avatar size={32} src={doc.created_by?.avatar?.link} />
                      <Stack
                        justifyContent={"start"}
                        alignItems={"start"}
                        direction={"column"}
                      >
                        <Text fontWeight={600} fontSize={14}>
                          {doc.created_by?.fullname}
                        </Text>
                        <Text fontWeight={400} fontSize={14}>
                          {doc?.created_by?.position?.name}
                        </Text>
                      </Stack>
                    </Stack>
                  ) : null}
                </BodyCell>
              </TableRow>
            ))}
        </AccordionDetails>
      </StyledAccordion>
    </BodyCell>
  );
};

const StyledAccordion = styled(Accordion)(() => {
  const { isDarkMode } = useTheme();
  return {
    "&.MuiAccordion-root": {
      width: "100%",
      border: "none",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: "#2196f350",
      borderRadius: 0,
      boxShadow: "none",
      backgroundColor: isDarkMode ? "grey.50" : "primary.light",
    },
  };
});

export default memo(DesktopCells);

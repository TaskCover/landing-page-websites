import React, { memo } from "react";
import { Box, Stack } from "@mui/material";
import { Text, Tooltip } from "components/shared";
import CloseIcon from "icons/CloseIcon";
import HistoryIcon from "icons/HistoryIcon";
import RestoreIcon from "icons/RestoreIcon";
import Avatar from "components/Avatar";

const HistoryDocItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Text
          sx={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          15 May 2020 8:00 am
        </Text>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              overflow: "hidden",
              bgcolor: "black",
              borderRadius: "100%",
            }}
          >
            {/* <Avatar></Avatar> */}
          </Box>
          <Text
            sx={{
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            vuhaithuongnute@gmail.com
          </Text>
        </Box>
      </Box>
      <Tooltip title={"Restore"}>
        <Box
          sx={{
            cursor: "pointer",
            p: "4px",
          }}
        >
          <RestoreIcon></RestoreIcon>
        </Box>
      </Tooltip>
    </Box>
  );
};

const DrawSlider = ({
  setOpenSlider,
}: {
  setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <HistoryIcon></HistoryIcon>
        </Box>
        <Box
          onClick={() => setOpenSlider(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <CloseIcon></CloseIcon>
        </Box>
      </Box>
      <Text
        sx={{
          my: "4px",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        Version history
      </Text>
      <Stack
        spacing={"16px"}
        sx={{
          marginTop: "12px",
        }}
      >
        <HistoryDocItem></HistoryDocItem>
        <HistoryDocItem></HistoryDocItem>
        <HistoryDocItem></HistoryDocItem>
        <HistoryDocItem></HistoryDocItem>
        <HistoryDocItem></HistoryDocItem>
      </Stack>
    </>
  );
};

export default memo(DrawSlider);

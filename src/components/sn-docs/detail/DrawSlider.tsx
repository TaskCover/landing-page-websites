/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { memo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Text, Tooltip } from "components/shared";
import CloseIcon from "icons/CloseIcon";
import HistoryIcon from "icons/HistoryIcon";
import RestoreIcon from "icons/RestoreIcon";
import Avatar from "components/Avatar";
import TextIcon from "icons/TextIcon";
import { Switch } from "components/Filters";
import { Fascinate } from "next/font/google";

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
  const [state, setState] = useState(2);

  const [isLargeText, setLargeText] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const onChangeText = (name: string, value: any) => {
    setLargeText(value);
  };
  const onChangeFull = (name: string, value: any) => {
    setIsFull(value);
  };

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
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Box
            onClick={() => setState(1)}
            sx={{
              padding: "4px",
              cursor: "pointer",
            }}
          >
            <TextIcon active={state === 1}></TextIcon>
          </Box>
          <Box
            sx={{
              padding: "4px",
              cursor: "pointer",
            }}
            onClick={() => setState(2)}
          >
            <HistoryIcon active={state === 2}></HistoryIcon>
          </Box>
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
        {state === 1 && "Text options"}
        {state === 2 && "Version history"}
      </Text>
      <Stack
        spacing={"16px"}
        sx={{
          marginTop: "12px",
        }}
      >
        {state === 1 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text fontSize={14} fontWeight={600}>
                Large text
              </Text>
              <Switch
                name="text"
                onChange={onChangeText}
                size="small"
                reverse
                value={isLargeText}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text fontSize={14} fontWeight={600}>
                Full width
              </Text>
              <Switch
                name="text"
                onChange={onChangeFull}
                size="small"
                reverse
                value={isFull}
              />
            </Box>
          </>
        )}
        {state === 2 && (
          <>
            <HistoryDocItem></HistoryDocItem>
            <HistoryDocItem></HistoryDocItem>
            <HistoryDocItem></HistoryDocItem>
            <HistoryDocItem></HistoryDocItem>
            <HistoryDocItem></HistoryDocItem>
          </>
        )}
      </Stack>
    </>
  );
};

export default memo(DrawSlider);

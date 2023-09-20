import { Avatar, Box, Checkbox, Typography } from "@mui/material";
import { NS_COMMON } from "constant/index";
import CircleCheckedFilled from "icons/CircleCheckedFilled";
import CircleUnchecked from "icons/CircleUnchecked";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProjectStatus } from "store/project/actions";

const AddMemberItem = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <Checkbox
          icon={<CircleUnchecked />}
          checkedIcon={<CircleCheckedFilled />}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            height: "48px",
            width: "48px",
          }}
        >
          <Avatar
            src={item?.avatar.link}
            sx={{
              borderRadius: "9999px",
              alignItems: "stretch",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography variant="h6" sx={{ width: "200px", color: "#212121" }}>
            {item?.fullname}
          </Typography>
          <Typography variant="body2" sx={{ width: "200px", color: "#828282" }}>
            {item?.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMemberItem;

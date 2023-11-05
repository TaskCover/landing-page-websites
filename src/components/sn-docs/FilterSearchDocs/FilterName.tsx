/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  popoverClasses,
} from "@mui/material";
import React, { memo, useState } from "react";
import { FilterSearchDocsProps, sxConfig } from "./FilterSearchDocs";
import { Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_DOCS } from "constant/index";
import { SelectMembers } from "components/sn-projects/components";
import { useFormik } from "formik";

const FilterName = ({ onChange, queries }: FilterSearchDocsProps) => {
  const docsT = useTranslations(NS_DOCS);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeField = (name: string, newValue?: any) => {
    formik.setFieldValue(name, newValue);
    onChange(name, newValue);
  };

  const onSubmit = () => {
    console.log("first");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      members: queries.member,
      owner: queries.owner,
    },
    onSubmit,
  });

  return (
    <>
      <MenuItem
        onClick={(e) => setAnchorEl(e.currentTarget)}
        component={ButtonBase}
        sx={sxConfig.item}
      >
        <Text variant="body2" color="grey.400">
          {docsT("filter.filter.name")}
        </Text>
      </MenuItem>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            minWidth: 270,
            maxWidth: 270,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
            },
          },
        }}
      >
        <Stack
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderTopWidth: 0,
            borderColor: "grey.100",
            borderRadius: 1,
          }}
        ></Stack>
      </Popover>
    </>
  );
};

export default memo(FilterName);

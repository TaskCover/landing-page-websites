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
import { FilterSearchDocsProps } from "./FilterSearchDocs";
import { Select, Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_DOCS } from "constant/index";
import { useFormik } from "formik";
import { useEmployeeOptions } from "store/company/selectors";

const FilterMemberEdit = ({ onChange, queries }: FilterSearchDocsProps) => {
  const docsT = useTranslations(NS_DOCS);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const commonT = useTranslations(NS_COMMON);

  const {
    options: employeeOptions,
    onGetOptions,
    isFetching,
    filters,
    pageSize,
    pageIndex,
    totalPages,
  } = useEmployeeOptions();

  const onChangeSearch = (name: string, newValue?: string | number) => {
    onGetOptions({ pageIndex: 1, pageSize: 20, [name]: newValue });
  };

  const onGetEmployeeOptions = () => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  };

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const options = [
    {
      label: "none",
      value: "",
    },
    ...employeeOptions,
  ];

  return (
    <>
      <MenuItem
        onClick={(e) => setAnchorEl(e.currentTarget)}
        component={ButtonBase}
        sx={sxConfig.item}
      >
        <Text variant="body2" color="grey.400">
          {docsT("filter.filter.lastEdited")}
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
        >
          <Select
            options={options}
            title={docsT("filter.filter.lastEdited")}
            hasAvatar
            onChange={(e) => {
              onChange("lastEdit", e.target.value);
            }}
            value={queries.lastEdit}
            rootSx={sxConfig.input}
            fullWidth
            onEndReached={onEndReached}
            onChangeSearch={onChangeSearch}
            searchProps={{
              value: filters?.email,
              placeholder: commonT("searchBy", { name: "email" }),
            }}
            onOpen={onGetEmployeeOptions}
          />
        </Stack>
      </Popover>
    </>
  );
};

export default memo(FilterMemberEdit);
const sxConfig = {
  input: {
    height: 56,
  },
  item: {
    width: "100%",
    py: 1,
    px: 2,
  },
};

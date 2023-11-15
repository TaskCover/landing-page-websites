/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, MenuList, Popover, Stack, popoverClasses } from "@mui/material";
import { Text } from "components/shared";
import { NS_COMMON, NS_DOCS } from "constant/index";
import ChevronIcon from "icons/ChevronIcon";
import { useTranslations } from "next-intl";
import React, { memo, useState } from "react";
import FilterMember from "./FilterMember";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import FilterMemberEdit from "./FilterMemberEdit";
import FilterMemberProject from "./FilterMemberProject";
import FilterProjectStatus from "./FilterProjectStatus";

export interface FilterSearchDocsProps {
  queries: Params;
  onChange: (name: string, value: any) => void;
}

const FilterSearchDocs = ({ onChange, queries }: FilterSearchDocsProps) => {
  const docsT = useTranslations(NS_DOCS);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const commonT = useTranslations(NS_COMMON);

  const isHasValue =
    queries?.user_id ||
    queries?.project ||
    queries?.lastEdit ||
    queries?.project_status;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          color: "grey.400",
          fontWeight: 600,
          height: 32,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <Text color={"gray.400"} fontWeight={600} fontSize={"14px"}>
          {docsT("filter.filter.filter")}
        </Text>
        <Box
          sx={{
            color: isHasValue ? "primary.main" : "grey.400",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronIcon fontSize="small"></ChevronIcon>
        </Box>
      </Box>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            minWidth: 150,
            maxWidth: 150,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
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
          <MenuList component={Box} sx={{ py: 1 }}>
            <FilterMember queries={queries} onChange={onChange}></FilterMember>
            <FilterMemberEdit
              queries={queries}
              onChange={onChange}
            ></FilterMemberEdit>
            {/* <FilterName queries={queries} onChange={onChange}></FilterName> */}
            <FilterMemberProject
              queries={queries}
              onChange={onChange}
            ></FilterMemberProject>
            <FilterProjectStatus
              queries={queries}
              onChange={onChange}
            ></FilterProjectStatus>
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(FilterSearchDocs);

export const sxConfig = {
  item: {
    width: "100%",
    py: 1,
    px: 2,
  },
};

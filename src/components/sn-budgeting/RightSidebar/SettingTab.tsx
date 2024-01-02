import { Box, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import { Text } from "components/shared";
import { PopperItem, PopperMenu } from "components/shared/PopperMenu";
import DropDownIcon from "icons/DropDownIcon";
import DuplicateIcon from "icons/DuplicateIcon";
import TrashIcon from "icons/TrashIcon";
import { useState } from "react";
import { TBudget } from "store/project/budget/action";

interface SettingTabProps {
  budget: TBudget;
}
export const SettingTab = ({ budget }: SettingTabProps) => {
  const { owner } = budget;
  const [restrictionEl, setRestrictionEl] = useState<HTMLElement | null>(null);

  return (
    <Box mt={3}>
      <Stack mb={3} gap={1}>
        <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
          Time warning
        </Text>
        <Text>
          {owner?.fullname} will get a warning when worked hours reach this
          percentage of estimated hours
        </Text>
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ "& .MuiTypography-root": { color: "black" } }}
            >
              kg
            </InputAdornment>
          }
          sx={{
            width: "100%",
            bgcolor: "grey.50",
            "& fieldset": { border: 0 },
          }}
        />
      </Stack>
      <Stack mb={3} gap={1}>
        <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
          Tracking type
        </Text>
        <Text>
          Depending on the type of tracking you choose people will be able to
          track on all services, services that have the same service type that
          is assigned to them or services that are assigned directly to them.
        </Text>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            bgcolor: "grey.50",
            borderRadius: "7px",
            p: "16.5px 14px",
            cursor: "pointer",
            mb: 2,
          }}
          onClick={(e) =>
            setRestrictionEl(restrictionEl ? null : e.currentTarget)
          }
        >
          <Text>No restriction</Text>
          <DropDownIcon sx={{ fontSize: "28px", color: "grey.400" }} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: "black",
            cursor: "pointer",
            py: 1,
          }}
        >
          <DuplicateIcon sx={{ fontSize: "24px", fontWeight: "bold" }} />
          <Text
            ml={1}
            sx={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
          >
            Dupicate
          </Text>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: "error.main",
            cursor: "pointer",
            py: 1,
          }}
        >
          <TrashIcon sx={{ fontSize: "24px", fontWeight: "bold" }} />
          <Text
            ml={1}
            sx={{ color: "error.main", fontSize: "18px", fontWeight: "bold" }}
          >
            Delete
          </Text>
        </Stack>
      </Stack>
      <PopperMenu
        anchorEl={restrictionEl}
        setAnchorEl={setRestrictionEl}
        placement="bottom"
        autoWidth={true}
      >
        <PopperItem>No restriction</PopperItem>
        <PopperItem>Restricted by person</PopperItem>
        <PopperItem>Restricted by service type</PopperItem>
      </PopperMenu>
    </Box>
  );
};

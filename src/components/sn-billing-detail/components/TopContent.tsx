import { memo, useMemo, useState } from "react";
import {
  Menu,
  MenuItem,
  Stack,
  StackProps,
  Theme,
  selectClasses,
} from "@mui/material";
import Link from "components/Link";
import ChevronIcon from "icons/ChevronIcon";
import { Button, IconButton, Text } from "components/shared";
import { useHeaderConfig } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import { usePathname } from "next-intl/client";
import { useParams } from "next/navigation";
import { PROJECT_MEMBERS_PATH, PROJECT_TASKS_PATH } from "constant/paths";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import { NS_BILLING, NS_PROJECT } from "constant/index";
import Avatar from "components/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dropdown } from "components/Filters";
import { Member } from "store/billing/reducer";
import { Option } from "constant/types";

const options = [
  "Duplicate Invoice",
  "Create Credit Invoice",
  "Delete Invoice",
];

const ITEM_HEIGHT = 48;

type TopContentProps = {
  tagsOptions?: Option[];
};
const TopContent = (props: TopContentProps) => {
  const { tagsOptions } = props;
  const { title, prevPath } = useHeaderConfig();
  const { isMdSmaller } = useBreakpoint();
  const billingT = useTranslations(NS_BILLING);
  const { id } = useParams() as { id: string };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack gap={2} p={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          flex={1}
          width="50%"
        >
          <Avatar size={40} />

          <Text fontWeight={600} variant={{ xs: "body2", md: "h4" }}>
            abc
          </Text>
        </Stack>

        <Button
          // startIcon={<PlusIcon />}
          // onClick={onAddNew}
          size="small"
          variant="primary"
        >
          Paid
        </Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          flex={1}
          width="50%"
        >
          <Button
            // startIcon={<PlusIcon />}
            // onClick={onAddNew}
            size="small"
            variant="primary"
          >
            Mark as sent
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"end"}
          spacing={1}
          flex={1}
          width="50%"
        >
          <Dropdown
            placeholder={"company name"}
            options={[]}
            name="status"
            onChange={() => {}}
            // value={queries?.status}
            rootSx={{
              px: "0px!important",
              [`& .${selectClasses.outlined}`]: {
                pr: "0!important",
                mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                  `${spacing(4)}!important`,
                "& .sub": {
                  display: "none",
                },
              },
            }}
          />

          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar size={40} />
            <PlusIcon
              sx={{
                display: { xs: "none", md: "block" },
                mr: 1,
                width: 18,
                height: 18,
              }}
            />
          </Stack>

          <Stack direction={"row"} gap={2}>
            <Dropdown
              placeholder={"members"}
              options={[]}
              name="status"
              onChange={() => {}}
              // value={queries?.status}
              rootSx={{
                px: "0px!important",
                [`& .${selectClasses.outlined}`]: {
                  pr: "0!important",
                  mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                    `${spacing(4)}!important`,
                  "& .sub": {
                    display: "none",
                  },
                },
              }}
            />
          </Stack>
          <Dropdown
            placeholder={"Tag"}
            options={tagsOptions ?? []}
            name="Tag"
            onChange={() => {}}
            // value={queries?.status}
            rootSx={{
              px: "0px!important",
              [`& .${selectClasses.outlined}`]: {
                pr: "0!important",
                mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                  `${spacing(4)}!important`,
                "& .sub": {
                  display: "none",
                },
              },
            }}
          />
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(TopContent);
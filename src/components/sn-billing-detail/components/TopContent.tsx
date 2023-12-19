import { memo, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Menu,
  MenuItem,
  Stack,
  StackProps,
  Theme,
  selectClasses,
} from "@mui/material";
import Link from "components/Link";
import ChevronIcon from "icons/ChevronIcon";
import { Button, IconButton, Select, Text } from "components/shared";
import { useHeaderConfig } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import { usePathname } from "next-intl/client";
import { useParams } from "next/navigation";
import { PROJECT_MEMBERS_PATH, PROJECT_TASKS_PATH } from "constant/paths";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import { NS_BILLING, NS_PROJECT } from "constant/index";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dropdown } from "components/Filters";
import { Billing, Member } from "store/billing/reducer";
import { Option, User } from "constant/types";
import TrashIcon from "icons/TrashIcon";
import {
  ContentCopyRounded,
  Subtitles,
  SubtitlesOutlined,
} from "@mui/icons-material";
import CopyIcon from "icons/CopyIcon";
import SelectMembers from "./SelectMembers";

const options = [
  "Duplicate Invoice",
  "Create Credit Invoice",
  "Delete Invoice",
];

const ITEM_HEIGHT = 48;

type TopContentProps = {
  tagsOptions?: Option[];
  item?: Billing;
  user: User;
  memberOptions?: Option[];
};
const TopContent = (props: TopContentProps) => {
  const { tagsOptions, item, memberOptions, user } = props;
  const { title, prevPath } = useHeaderConfig();
  const { isMdSmaller } = useBreakpoint();
  const billingT = useTranslations(NS_BILLING);
  const { id } = useParams() as { id: string };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [listUser, setListUser] = useState<Member[]>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const setMember = new Set<String>();

  const onChangeMember = (name, data) => {
    setListUser(data);
  };

  useEffect(() => {
    if (item?.user && item.user.length > 0) {
      const filterMember = item.user?.map((item) => {
        const member = {
          id: item.id,
          fullname: item.fullname,
          avatar: item?.avatar,
        } as Member;
        return member;
      });
      setListUser([...filterMember]);
    }
  }, [item]);
  useEffect(() => {
    if (user) {
      const member = {
        id: user.id,
        fullname: user.fullname,
        avatar: user?.avatar,
      } as Member;
      setListUser([member]);
    }
  }, [user]);

  return (
    <Stack gap={2} pl={5} pt={2} ml={5}>
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
          <Avatar />

          <Text fontWeight={600} variant={{ xs: "body2", md: "h4" }}>
            {"Invoice " +
              (item?.invoiceNumber ? item?.invoiceNumber?.toString() : "")}
          </Text>
        </Stack>

        <Box
          sx={{
            textAlign: "center",
            width: 100,
            padding: 1,
            borderRadius: 2,
            background: "#C9F7F5",
            color: "#1BC5BD",
          }}
        >
          <Text variant={"body2"} sx={{ color: "#1BC5BD" }}>
            Paid
          </Text>
        </Box>
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
            onChange={(name, value) => null}
            // value={listUser}
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
            <AvatarGroup total={listUser?.length}>
              {listUser?.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <Avatar sizes={item.avatar?.link} />;
              })}
            </AvatarGroup>
          </Stack>

          <Stack direction={"row"} gap={2}>
            <SelectMembers
              onChange={(name, data) => onChangeMember(name, data)}
              name=""
              value={listUser}
            />
          </Stack>
          <Dropdown
            placeholder={"Tag"}
            options={tagsOptions ?? []}
            name="Tag"
            onChange={() => null}
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
                width: "25ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option === "Duplicate Invoice" ? (
                  <Stack gap={2} direction={"row"} alignItems={"center"}>
                    <ContentCopyRounded />
                    <Text variant={"body2"}>Duplicate Invoice</Text>
                  </Stack>
                ) : option === "Create Credit Invoice" ? (
                  <Stack gap={2} direction={"row"} alignItems={"center"}>
                    <SubtitlesOutlined />
                    <Text variant={"body2"}>Create Credit Invoice</Text>
                  </Stack>
                ) : option === "Delete Invoice" ? (
                  <Stack
                    gap={2}
                    direction={"row"}
                    alignItems={"center"}
                    color={"red"}
                  >
                    <TrashIcon sx={{ fontSize: 25 }} />
                    <Text variant={"body2"} color={"red"}>
                      Delete Invoice
                    </Text>
                  </Stack>
                ) : (
                  ""
                )}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(TopContent);

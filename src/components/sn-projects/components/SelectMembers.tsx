import {
  ChangeEvent,
  MouseEvent,
  memo,
  useEffect,
  useId,
  useState,
} from "react";
import { MenuList, Popover, Stack, popoverClasses } from "@mui/material";
import { Checkbox, IconButton, Select, Text } from "components/shared";
import CircleCloseIcon from "icons/CircleCloseIcon";
import ChevronIcon from "icons/ChevronIcon";
import { useEmployeeOptions } from "store/company/selectors";
import Avatar from "components/Avatar";
import { Employee } from "store/company/reducer";
import { usePositions } from "store/global/selectors";
import { useSnackbar } from "store/app/selectors";
import { Member } from "../helpers";

type SelectMembersProps = {
  value?: Member[];
  name: string;
  onChange: (name: string, data: Member[]) => void;
};

const SelectMembers = (props: SelectMembersProps) => {
  const { name, value: members = [], onChange } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const { items } = useEmployeeOptions();
  const { options, onGetPositions } = usePositions();

  const onOpen = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onRemoveMember = (id: string) => {
    const newData = [...members];
    const indexSelected = members.findIndex((item) => item.id === id);
    if (indexSelected !== -1) {
      newData.splice(indexSelected, 1);
    }
    onChange(name, newData);
  };

  const onChangeMembers = (id: string, position: string, fullname: string) => {
    const indexSelected = members.findIndex((item) => item.id === id);

    const newData = [...members];
    if (indexSelected === -1) {
      newData.push({ id, position, fullname });
    } else {
      newData.splice(indexSelected, 1);
    }
    onChange(name, newData);
  };

  useEffect(() => {
    if (options.length) return;
    onGetPositions();
  }, [onGetPositions, options.length]);

  return (
    <>
      <Stack
        direction="row"
        py={1}
        px={2.5}
        bgcolor="grey.50"
        justifyContent="space-between"
        onClick={onOpen}
        minHeight={56}
        borderRadius={1}
        sx={{ cursor: "pointer" }}
      >
        <Stack flex={1} spacing={0.5}>
          <Text variant="caption" color="grey.300">
            Danh sách thành viên
          </Text>
          <Stack
            direction="row"
            rowGap={1.5}
            columnGap={1.5}
            flex={1}
            flexWrap="wrap"
          >
            {members.map((member) => (
              <DisplayItem
                key={member.id}
                {...member}
                onRemove={onRemoveMember}
              />
            ))}
          </Stack>
        </Stack>

        <ChevronIcon
          sx={{ color: "grey.400", fontSize: 24, alignSelf: "center" }}
        />
      </Stack>
      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            width: anchorEl?.offsetWidth ?? 200,
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
          p={2}
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderColor: "grey.100",
            borderBottomLeftRadius: 1,
            borderBottomRightRadius: 1,
          }}
          maxHeight={400}
        >
          <MenuList component={Stack} spacing={2}>
            {items.map((item) => {
              const isChecked = members.some((member) => item.id === member.id);
              const positionOfProject = members.find(
                (member) => item.id === member.id,
              )?.position;
              return (
                <MemberItem
                  key={item.id}
                  {...item}
                  onChange={onChangeMembers}
                  positionOfProject={positionOfProject}
                  checked={isChecked}
                />
              );
            })}
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(SelectMembers);

const MemberItem = (
  props: Employee & {
    onChange: (id: string, position: string, fullname: string) => void;
    checked: boolean;
    positionOfProject?: string;
  },
) => {
  const { id, fullname, email, onChange, checked, positionOfProject } = props;

  const { options } = usePositions();
  const { onAddSnackbar } = useSnackbar();

  const [position, setPosition] = useState<string | undefined>(
    positionOfProject,
  );

  const onChangePosition = (event: ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!position) {
      onAddSnackbar("Bạn cần chọn vị trí cho thành viên này trước", "warning");
      return;
    }
    onChange(id, position, fullname);
  };

  useEffect(() => {
    setPosition(positionOfProject);
  }, [positionOfProject]);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Checkbox onChange={onSelect} checked={checked} />
      <Stack direction="row" spacing={1.5} width="40%">
        <Avatar size={40} />
        <Stack>
          <Text variant="h6">{fullname}</Text>
          <Text variant="body2">{email}</Text>
        </Stack>
      </Stack>
      <Stack width="40%">
        <Select
          title="Vị trí"
          name="position"
          options={options}
          value={position}
          onChange={onChangePosition}
        />
      </Stack>
    </Stack>
  );
};

const DisplayItem = (
  props: Member & {
    onRemove: (id: string) => void;
  },
) => {
  const { fullname, id, onRemove } = props;

  const onRemoveMember = (event) => {
    event.stopPropagation();
    onRemove(id);
  };

  return (
    <Stack
      direction="row"
      py={0.25}
      px={0.5}
      borderRadius={5}
      bgcolor="primary.light"
      spacing={1}
      display="inline-flex"
      width="fit-content"
    >
      <Text variant="body2" maxWidth={150} noWrap tooltip={fullname}>
        {fullname}
      </Text>
      <IconButton noPadding onClick={onRemoveMember}>
        <CircleCloseIcon sx={{ color: "grey.400" }} />
      </IconButton>
    </Stack>
  );
};

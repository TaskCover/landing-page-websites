import { ChangeEvent, memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useSnackbar } from "store/app/selectors";
import { Employee } from "store/company/reducer";
import { Text, Checkbox, Select } from "components/shared";
import Avatar from "components/Avatar";
import { usePositionOptions } from "store/global/selectors";

type MemberItemProps = Employee & {
  onChange: (id: string, position: string, fullname: string) => void;
  checked: boolean;
  positionOfProject?: string;
};

const MemberItem = (props: MemberItemProps) => {
  const { id, fullname, email, onChange, checked, positionOfProject } = props;

  const { options } = usePositionOptions();
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
      <Stack direction={{ sm: "row" }} spacing={2} flex={1}>
        <Stack direction="row" spacing={1.5} flex={1} maxWidth={{ sm: "50%" }}>
          <Avatar size={40} />
          <Stack>
            <Text variant="h6">{fullname}</Text>
            <Text variant="body2">{email}</Text>
          </Stack>
        </Stack>
        <Stack flex={1} maxWidth={{ sm: "50%" }} py={{ xs: 2, sm: 0 }}>
          <Select
            title="Vị trí"
            name="position"
            options={options}
            value={position}
            onChange={onChangePosition}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(MemberItem);

import { ChangeEvent, memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useSnackbar } from "store/app/selectors";
import { Employee } from "store/company/reducer";
import { Text, Checkbox, Select } from "components/shared";
import Avatar from "components/Avatar";
import { usePositionOptions } from "store/global/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";

type MemberItemProps = Employee & {
  onChange: (
    id: string,
    position: string,
    fullname: string,
    isUpdatePosition?: boolean,
  ) => void;
  checked: boolean;
  positionOfProject?: string;
};

const MemberItem = (props: MemberItemProps) => {
  const { id, fullname, email, avatar, onChange, checked, positionOfProject } =
    props;

  const { options } = usePositionOptions();
  const { onAddSnackbar } = useSnackbar();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);

  const [position, setPosition] = useState<string | undefined>(
    positionOfProject,
  );

  const onChangePosition = (event: ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
    if (checked) {
      onChange(id, event.target.value, fullname, true);
    }
  };

  const onSelect = () => {
    if (!position) {
      onAddSnackbar(
        projectT("list.notification.choosePositionFirst"),
        "warning",
      );
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
          <Avatar size={40} src={avatar?.link} />
          <Stack>
            <Text variant="h6">{fullname}</Text>
            <Text variant="body2">{email}</Text>
          </Stack>
        </Stack>
        <Stack flex={1} maxWidth={{ sm: "50%" }} py={{ xs: 2, sm: 0 }}>
          <Select
            title={commonT("position")}
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

import { Switch, styled } from "@mui/material";
import { FunctionComponent } from "react";

const SwitchCustom = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export type Props = {
  getChecked?: (checked: boolean) => void;
};

export const SwitchAtom: FunctionComponent<Props> = (props) => {
  const { getChecked } = props;
  return (
    <SwitchCustom
      onChange={(e, checked) => {
        getChecked && getChecked(checked);
      }}
    />
  );
};

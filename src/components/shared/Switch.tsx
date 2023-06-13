import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  switchClasses,
  SxProps,
} from "@mui/material";
import { ChangeEvent, memo } from "react";

export type SwitchProps = MuiSwitchProps & {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

const Switch = (props: SwitchProps) => {
  const { onChange, value = false, ...rest } = props;

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChange && onChange(isChecked);
  };

  return (
    <MuiSwitch
      disableRipple
      sx={defaultSx as SxProps}
      checked={value}
      onChange={onChangeValue}
      {...rest}
    />
  );
};

export default memo(Switch);

const defaultSx = {
  width: 52,
  height: 28,
  p: 0,
  borderRadius: 4,
  boxSizing: "border-box",
  [`& .${switchClasses.switchBase}`]: {
    p: 0,
    top: 2,
    left: 2,
    [`&.${switchClasses.disabled}`]: {
      opacity: 0.25,
    },
    [`&.${switchClasses.checked}`]: {
      top: 2,
      left: 6,
    },

    [`&.${switchClasses.checked}+.${switchClasses.track}`]: {
      backgroundColor: "primary.main",
      borderColor: "primary.main",
      opacity: 1,
    },
    [`&.${switchClasses.checked}.${switchClasses.disabled}+.${switchClasses.track}`]:
      {
        opacity: 0.7,
      },
    [`&.${switchClasses.checked} .${switchClasses.thumb}`]: {
      backgroundColor: "common.white",
      borderColor: "common.white",
    },
  },
  [`& .${switchClasses.track}`]: {
    backgroundColor: "common.white",
    border: "1px solid",
    borderColor: "grey.A200",
    borderRadius: 4,
  },
  [`& .${switchClasses.thumb}`]: {
    width: 24,
    height: 24,
    backgroundColor: "grey.300",
    border: "1px solid",
    borderColor: "grey.300",
    borderRadius: 4,
    boxSizing: "border-box",
  },
};

import { memo } from "react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

type CheckboxProps = MuiCheckboxProps & {};

const Checkbox = (props: CheckboxProps) => {
  const { sx, ...rest } = props;
  return (
    <MuiCheckbox
      color="secondary"
      sx={{ p: 0, color: "grey.300", ...sx }}
      {...rest}
    />
  );
};

export default memo(Checkbox);

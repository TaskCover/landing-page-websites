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
      sx={{
        p: 0,
        color: "#1BC5BD!important",
        borderBlock: "5px!important",
        borderRadius: "5px!important",

        ...sx,
      }}
      {...rest}
    />
  );
};

export default memo(Checkbox);

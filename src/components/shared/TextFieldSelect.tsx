/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import _ from "lodash";

import {
  MenuItem,
  Stack,
  InputLabel,
  Typography,
  Box,
  FormHelperText,
  Select,
  SelectProps,
} from "@mui/material";
import useTheme from "hooks/useTheme";
import OutLineExpandIcon from "icons/OutLineExpandIcon";
export interface IOptionStructure {
  label: string;
  value: string;
}

interface IProps extends SelectProps {
  label?: string;
  options: IOptionStructure[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  hiddenIcon?: boolean;
}

const TextFieldSelect: React.FC<IProps> = React.forwardRef(
  (
    {
      value = "",
      label,
      onChange,
      required,
      disabled,
      placeholder,
      fullWidth,
      error,
      helperText,
      sx,
      options,
      MenuProps,
      hiddenIcon = false,
      ...props
    },
    ref,
  ) => {
    const { isDarkMode } = useTheme();

    const containerRef = React.useRef<any>(null);
    const randomId = (Math.random() + 1).toString(36).substring(7);

    const [isFocus, setIsFocus] = React.useState<boolean>(false);

    const _renderOptions = () => {
      if (_.isEmpty(options))
        return (
          <MenuItem
            disabled
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              color: "#212121",
            }}
          >
            No options
          </MenuItem>
        );
      return _.map(options, (option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "#212121",
            // '&.Mui-selected, &.Mui-selected:hover, &:hover': {
            //   backgroundColor: CommonColors.mainColor,
            // },
          }}
        >
          {option.label}
        </MenuItem>
      ));
    };

    return (
      <Stack>
        {_renderOptions()}
      </Stack>
    );
  },
);
TextFieldSelect.displayName = "TextFieldSelect";
export default TextFieldSelect;

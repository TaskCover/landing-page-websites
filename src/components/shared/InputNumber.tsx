import { memo, useMemo } from "react";
import Input, { InputProps } from "./Input";
import { InputAdornment } from "@mui/material";
import ChevronIcon from "icons/ChevronIcon";

type InputNumberProps = InputProps & {
  numberType?: "integer" | "float";
  negative?: boolean;
};

const InputNumber = (props: InputNumberProps) => {
  const {
    value,
    inputProps,
    onChangeValue,
    numberType = "float",
    negative,
    ...rest
  } = props;

  const onChange = (newValue?: string | number) => {
    let parsedValue = newValue ? newValue.toString() : "";
    if (
      parsedValue &&
      (numberType !== "integer" || !parsedValue.includes("."))
    ) {
      parsedValue = parsedValue.replace(/,/g, "");
      if (!isNaN(Number(parsedValue))) {
        if (parsedValue?.slice(0, 2) === "00") {
          // Avoid 000.x
          parsedValue = parsedValue.slice(1);
        }
        if (Number(newValue) >= 1 && (parsedValue[0] ?? "") === "0") {
          // Remove 0 to avoid 0123.444 => 123.444
          parsedValue = parsedValue?.slice(1);
        }
        if (Number(parsedValue) === Infinity) {
          parsedValue = "";
        }
        onChangeValue && onChangeValue(parsedValue);
      }
      // Handle negative
      if (negative && parsedValue === "-") {
        onChangeValue && onChangeValue(parsedValue);
      }
    } else {
      onChangeValue && onChangeValue(value);
    }
  };

  const valueFormatted = useMemo(() => {
    if (value === undefined) return value;
    const valueParsed =
      value === null
        ? ""
        : typeof value === "number"
        ? value.toString()
        : value;
    const arraySplit = valueParsed.split(".");
    const integer = arraySplit[0];
    const decimal = arraySplit[1] ?? "";
    return (
      valueWithCommas(integer) + (arraySplit.length === 2 ? "." : "") + decimal
    );
  }, [value]);

  const onAdd = (num: number) => {
    return () => {
      const newValue =
        (!value && value != 0) ||
        isNaN(typeof value === "string" ? Number(value) : value)
          ? 1
          : Number(value) + num;
      onChangeValue && onChangeValue(newValue);
    };
  };

  const onBlur = () => {
    const numberable = Boolean(value || (value !== "" && value == 0));
    const newValue = numberable ? Number(value) : undefined;
    onChangeValue && onChangeValue(newValue);
  };

  return (
    <Input
      value={valueFormatted}
      inputProps={{
        onBlur,
        ...inputProps,
      }}
      onChangeValue={onChange}
      {...rest}
      endNode={
        <InputAdornment sx={sxConfigs.adornment} position="end">
          <ChevronIcon
            onClick={onAdd(1)}
            sx={{ ...sxConfigs.icon, transform: "rotate(180deg)" }}
          />
          <ChevronIcon onClick={onAdd(-1)} sx={sxConfigs.icon} />
        </InputAdornment>
      }
    />
  );
};

export default memo(InputNumber);

const sxConfigs = {
  adornment: {
    flexDirection: "column",
    height: "100%",
    ml: 0,
  },
  icon: {
    color: "grey.400",
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "primary.main",
    },
  },
};

const valueWithCommas = (value: string | number) => {
  value = typeof value === "number" ? value.toString() : value;
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

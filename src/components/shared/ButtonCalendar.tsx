import { Button } from "@mui/material";
import { ReactElement } from "react";

type ButtonProps = {
  icon?: ReactElement;
  title?: string;
  sx?: object;
};

const ButtonCalendar = (props: ButtonProps) => {
  const { icon, title, sx, ...rest } = props;

  return (
    <Button
      startIcon={icon}
      size="small"
      variant="contained"
      sx={{
        height: "32px",
        width: "161px",
        padding: 0,
        backgroundColor: "common.white",
        color: "grey.300",
        textTransform: "none",
        border: "1px solid #999999",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#ebf8f8",
          //opacity: "10%",
          border: "1px solid #1BC5BD",
        },
        ...sx,
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default ButtonCalendar;

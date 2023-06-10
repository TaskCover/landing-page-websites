import React, { FunctionComponent, ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type Props = {
  label: string;
  onClick?: () => void;
  items: {
    value: string;
    label: string;
  }[];
  onItemClick?: (value: string) => void;
  onOutsiteClick?: () => void;
};

export const MenuAtom: FunctionComponent<Props> = (props) => {
  const { label, onClick, items, onItemClick, onOutsiteClick } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onClick && onClick();
  };
  const handleClose = (label: string) => {
    setAnchorEl(null);
    onOutsiteClick && onOutsiteClick();
  };
  const handleSelect = (value: string) => {
    console.log(value);
    setAnchorEl(null);
    onItemClick && onItemClick(value);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color="info"
        sx={{
          fontSize: "1.4rem",
          lineHeight: "18px",
          pl: 0,
          pr: 0,
          textTransform: "none",
        }}
      >
        {props.label}

        <KeyboardArrowDownIcon
          sx={{ width: "20px", height: "20px", ml: 0.5 }}
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <MenuItem
              onClick={() => {
                handleSelect(item.value);
              }}
              key={index}
              sx={{ fontSize: "1.4rem", color: "#212121" }}
            >
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

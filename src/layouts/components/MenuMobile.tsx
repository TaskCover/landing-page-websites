import { Stack, MenuList, MenuItem } from "@mui/material";
import { memo, useState } from "react";
import { Button, Text } from "components/shared";
import CloseIcon from "icons/CloseIcon";
import { MenuItemProps } from "./helpers";
import Link from "next/link";
import BarsIcon from "icons/BarsIcon";

const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Stack sx={{ display: { md: "none", xs: "flex" } }}>
      <BarsIcon sx={{ fontSize: 24 }} onClick={handleOpen} />
      <Stack
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          width: "70%",
          backgroundColor: "rgba(255, 255, 255)",
          zIndex: 99,
          transform: `translateX(${isOpen ? 0 : "100%"})`,
          transition: "all .3s",
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            px: 1,
            py: 1,
            zIndex: 10,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Stack>
        <MenuList sx={{ width: "100%", height: "100%" }}>
          {DATA.map((item, index) => (
            <MenuItem key={index}>
              <Link href={item.href ?? "/"}>
                <Text variant="inherit">{item.label}</Text>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Stack>
    </Stack>
  );
};

export default memo(MenuMobile);

const DATA: MenuItemProps[] = [
  {
    label: "Product",
    href: "",
  },
  {
    label: "AI",
    href: "",
  },
  {
    label: "Pricing",
    href: "",
  },
  {
    label: "Use cases",
    href: "",
  },
  {
    label: "Resources",
    href: "",
  },
];

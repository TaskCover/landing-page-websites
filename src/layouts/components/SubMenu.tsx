import { PopperProps, Popper, MenuList, Box, MenuItem } from "@mui/material";
import Link, { LinkProps } from "components/Link";
import { Text } from "components/shared";
import { useId } from "react";
import { MenuItemProps } from "./helpers";

const SubMenu = (
  props: Omit<PopperProps, "children"> & { options: MenuItemProps[] },
) => {
  const { options, ...rest } = props;
  const popoverId = useId();

  return (
    <Popper
      id={popoverId}
      placement="right-start"
      sx={{
        borderRadius: 1,
        width: 200,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: "common.white",
        top: ({ spacing }) => `${spacing(2)}!important`,
        zIndex: 1221,
      }}
      {...rest}
    >
      <MenuList component={Box}>
        {options.map((item) => (
          <MenuItem
            className="row-center"
            component={Link}
            href={item?.href as LinkProps["href"]}
            sx={{
              py: 1,
              px: 0,

              color: "grey.400",
              "& svg": {
                color: "grey.400",
              },
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
            key={item.href}
            underline="none"
          >
            {item.icon}
            <Text ml={1.5} variant="body2" color="inherit">
              {item.label}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Popper>
  );
};

export default SubMenu;

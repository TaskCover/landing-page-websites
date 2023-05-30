import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  sidebarItems,
  isSidebarItemSelected,
  getSidebarItemSelected,
} from "./SidebarItems";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

export type Props = {
  children: ReactNode;
  appbarContent?: ReactNode;
};

const drawerWidth = 340;
const appBarHeigh = 50;
const collapseSidebar = 60;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: "#F5F5F5",
  minHeight: "100vh",
  padding: theme.spacing(3),
  paddingTop: "74px",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `- ${drawerWidth - collapseSidebar}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    width: `calc(100% - ${collapseSidebar}px)`,
    marginLeft: `${collapseSidebar}px`,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 3),
  marginTop: "40px",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

interface ListItemSidebarProps extends ListItemProps {
  open?: boolean;
}

const ListItemSidebar = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "open",
})<ListItemSidebarProps>(({ theme, open }) => ({
  padding: open ? theme.spacing(0, 3) : 0,
}));

const ListItemTextSidebar = styled(ListItemText)(({ theme }) => ({
  fontSize: "1.6rem",
  color: "#666666",
  marginLeft: "16px",
}));

const openedMixin = (theme: Theme): CSSObject => ({
  visibility: "visible !important" as "visible",
  transform: "none  !important" as "none",
  width: `${drawerWidth}px`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  visibility: "visible !important" as "visible",
  transform: "none  !important" as "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden !important" as "hidden",
  width: `${collapseSidebar}px`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const ManageLayoutAtom: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    localStorage.setItem("sidebar", "open");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem("sidebar", "close");
    setOpen(false);
  };

  const isSelectedItem = (index: number) => {
    return isSidebarItemSelected(router.pathname, index) ? true : undefined;
  };

  const onSidebarItemClick = (url: string, index: number) => {
    if (!isSelectedItem(index)) {
      router.push(url);
    }
  };

  useEffect(() => {
    setOpen(!(localStorage.getItem("sidebar") === "close"));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            minHeight: { sm: `${appBarHeigh}px` },
            maxHeight: { sm: `${appBarHeigh}px` },
          }}
        >
          <Typography noWrap component="div">
            {props.appbarContent}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" open={open}>
        <DrawerHeader
          sx={{
            padding: open ? "0 24px" : "0 0",
          }}
        >
          <img
            src={
              open
                ? "/images/logo_sidebar.png"
                : "/images/logo_sidebar_mini.png"
            }
            className={
              open ? styles["manage__logo"] : styles["manage__logo-mini"]
            }
            onClick={() => {
              !open && handleDrawerOpen();
            }}
          />
          {open && (
            <IconButton onClick={handleDrawerClose} sx={{ padding: 0 }}>
              <img src={"/images/icon_collapse.png"} />
            </IconButton>
          )}
        </DrawerHeader>
        <List sx={{ marginTop: "40px", padding: 0, width: "100%" }}>
          {sidebarItems.map((sidebarItem, index) => (
            <ListItemSidebar key={index} disablePadding open={open}>
              <ListItemButton
                selected={isSelectedItem(index)}
                onClick={() => onSidebarItemClick(sidebarItem.url, index)}
                sx={{ p: open ? "8px 16px" : "11px 0px" }}
              >
                <div className={styles["manage__sidebar__item"]}>
                  <img
                    src={sidebarItem.iconSrc}
                    className={styles["manage__sidebar_icon"]}
                  />
                  {open && (
                    <ListItemTextSidebar
                      primary={sidebarItem.label}
                      disableTypography={true}
                    />
                  )}
                </div>
                {open && <KeyboardArrowDownIcon />}
              </ListItemButton>
            </ListItemSidebar>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <div className={styles["manage__container"]}>{props.children}</div>
      </Main>
    </Box>
  );
};

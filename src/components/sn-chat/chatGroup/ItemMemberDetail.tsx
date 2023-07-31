import Avatar from "components/Avatar";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreSquareIcon from "icons/MoreSquareIcon";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { IconButton } from "components/shared";
import { useState } from "react";
import DefaultPopupLayout from "components/TimeTracking/TimeTrackingModal/DefaultPopupLayout";

interface ItemMemberDetailProp {
  admin?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  callbackAddAdmin?: () => void;
  callbackRemove?: () => void;
  onClick?: () => void;
}

const ItemMemberDetail = ({
  admin,
  data,
  callbackAddAdmin,
  callbackRemove,
  onClick,
}: ItemMemberDetailProp) => {
  const TYPE_POPUP = {
    ADD_ADMIN: "ADD_ADMIN",
  };

  const init = {
    type: "",
    statusPopup: false,
    title: "",
    content: <></>,
    actionType: 0,
    widthPopup: "500px",
  };

  const [showPopup, setShowPopup] = useState(init);
  const commonT = useTranslations(NS_COMMON);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickMenu = (action: "addAdmin" | "remove") => {
    setAnchorEl(null);
    if (action === "addAdmin" && callbackAddAdmin) {
      callbackAddAdmin();
      setShowPopup(init);
    }
    if (action === "remove" && callbackRemove) callbackRemove();
  };

  const handleClosePopup = () => {
    setShowPopup(init);
  };

  const _renderContentPopup = () => {
    return (
      <Box
        sx={{
          margin: "10px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            margin: "10px 0",
            justifyContent: "center",
          }}
        >
          {showPopup?.content}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            padding: 2,
          }}
        >
          <Button
            type="button"
            variant="primaryOutlined"
            size="small"
            sx={defaultSx.buttonCancel}
            onClick={handleClosePopup}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            variant="primary"
            sx={defaultSx.buttonConfirm}
            type="button"
            size="small"
            onClick={() => handleClickMenu("addAdmin")}
          >
            {commonT("form.confirm")}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <Avatar
          alt="Avatar"
          size={32}
          src={data?.avatar}
          style={{
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="inherit"
            color="#212121"
            fontWeight={600}
            fontSize={14}
          >
            {data?.fullname}
          </Typography>
          <Typography
            variant="caption"
            color="#666666"
            fontWeight={400}
            fontSize={12}
          >
            {`${data?.username}@`}
          </Typography>
        </Box>
      </Box>
      <Box>
        {data?.roles?.includes("owner") ? (
          <Button
            variant="primary"
            sx={{
              background: "#ECECF3",
              fontSize: "0.75rem",
              fontWeight: 400,
            }}
            type="button"
            size="small"
          >
            {commonT("form.admin")}
          </Button>
        ) : (
          <>
            <IconButton noPadding size="normal">
              <MoreSquareIcon onClick={handleClick} />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {true ? (
                <>
                  <MenuItem onClick={() => {
                    setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.ADD_ADMIN,
                      statusPopup: true,
                      title: "Add as admin",
                      content: <>Are you sure add as admin?</>,
                    }));
                  }}>
                    Add as admin
                  </MenuItem>
                  <MenuItem onClick={() => handleClickMenu("remove")}>
                    Remove from chat{" "}
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
            </Menu>
          </>
        )}
      </Box>
      <DefaultPopupLayout
        title={showPopup?.title}
        content={_renderContentPopup()}
        open={showPopup?.statusPopup}
        onClose={handleClosePopup}
        sx={{ width: showPopup?.widthPopup }}
      />
    </Box>
  );
};

const defaultSx = {
  buttonCancel: {
    minWidth: 120,
    mx: 1.5,
    borderRadius: "0.25rem",
    background: "var(--brand-primary, #3699FF)",
    color: "#fff",
    border: "1px solid var(--brand-primary, #3699FF)",
    "&:hover": {
      background: "var(--brand-primary, #3699FF)",
    },
  },
  buttonConfirm: {
    minWidth: 120,
    mx: 1.5,
    borderRadius: "0.25rem",
    border: "1px solid var(--brand-primary, #3699FF)",
    color: "var(--brand-primary, #3699FF)",
  },
};

export default ItemMemberDetail;

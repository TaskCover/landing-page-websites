import Avatar from "components/Avatar";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ItemDetail from "./components/ItemDetail";
import ItemMemberDetail from "./ItemMemberDetail";
import GroupNameIcon from "icons/GroupNameIcon";
import DefaultPopupLayout from "components/TimeTracking/TimeTrackingModal/DefaultPopupLayout";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";

const ChatDetailGroup = () => {
  const commonT = useTranslations(NS_COMMON);

  const init = {
    statusPopup: false,
    title: "",
    content: ""
  }
  const [showPopup, setShowPopup] = useState(init)
  const handlePopup = () => {
    setShowPopup(init)
  }
  return (
    <>
      <Box sx={{
        margin: "10px"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Avatar
            alt="Avatar"
            size={80}
            style={{
              borderRadius: "10px",
              margin: 'auto'
            }}
          />
        </Box>
        <Box sx={{
          borderBottom: "1px solid #ECECF3",
          paddingBottom: "10px",
        }}>
          <ItemDetail
            text={'ok'}
            icon={<GroupNameIcon />}
            iconClick={<ArrowDownIcon />}
            onClick={() => {
              // console.log(123)
            }}
          />
          <ItemDetail
            text={'ok'}
            icon={<ArrowDownIcon />}
            iconClick={<ArrowDownIcon />}
            onClick={() => {
              // console.log(123)
            }}
          />
          <ItemDetail
            text={'ok'}
            icon={<ArrowDownIcon />}
            iconClick={<ArrowDownIcon />}
            onClick={() => {
              // console.log(123)
            }}
          />
          <ItemDetail
            text={'ok'}
            icon={<ArrowDownIcon />}
            iconClick={<ArrowDownIcon />}
            onClick={() => {
              // console.log(123)
            }}
          />
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}>
          <Box>
            <Typography variant="caption" color="#212121" fontSize={16} fontWeight={600}>
              Member(5)
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="#3699FF" fontSize={14} fontWeight={600} sx={{ cursor: "pointer" }}>
              See more
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          height: "180px",
          overflow: "auto"
        }}>
          <ItemMemberDetail />
          <ItemMemberDetail />
          <ItemMemberDetail />
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Box>
            <Box sx={{ marginBottom: 1 }} >
              <Typography variant="caption" color="#F64E60" fontSize={14} fontWeight={600} sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPopup({
                    statusPopup: true,
                    title: "Leave Group",
                    content: "Are you sure to leave group?",
                  })
                }}
              >
                {"Delete group"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="#F64E60" fontSize={14} fontWeight={600} sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPopup({
                    statusPopup: true,
                    title: "Delete Group",
                    content: "Are you sure to delete group?",
                  })
                }}
              >
                {"Leave group"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <DefaultPopupLayout
        title={showPopup?.title}
        content={
          <Box sx={{
            margin: "10px auto"
          }}>
            <Box>{showPopup?.content}</Box>
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
                sx={defaultSx.button}
                onClick={()=>{setShowPopup(init)}}
              >
                {commonT("form.cancel")}
              </Button>
              <Button
                variant="primary"
                sx={defaultSx.button}
                type="button"
                size="small"
                onClick={()=>{setShowPopup(init)}}
              // pending={pending}
              >
                {commonT("form.confirm")}
              </Button>
            </Box>
          </Box>
        }
        open={showPopup?.statusPopup}
        onClose={handlePopup}
        sx={{ width: "500px" }}
      />
    </>
  );
};

export default ChatDetailGroup;

const defaultSx = {
  root: {
    minWidth: { sm: 500 },
    minHeight: 230,
    px: 3,
  },
  bottom: {
    p: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    borderBottom: "1px solid",
    borderColor: "grey.100",
    pb: 3,
    mx: 0,
    "& > p": {
      textAlign: "center",
    },
    "& > button": {
      top: 0,
      transform: "unset",
    },
  },
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};
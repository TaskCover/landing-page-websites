/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import Avatar from "components/Avatar";
import { Box, Button, Fab, Typography } from "@mui/material";
import ItemDetail from "../components/ItemDetail";
import ItemMemberDetail from "./ItemMemberDetail";
import GroupNameIcon from "icons/GroupNameIcon";
import DefaultPopupLayout from "components/TimeTracking/TimeTrackingModal/DefaultPopupLayout";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import MediaFileIcon from "icons/MediaFileIcon";
import LinkIcon from "icons/LinkIcon";
import FileGroupIcon from "icons/FileGroupIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
import EditGroupNameIcon from "icons/EditGroupNameIcon";
import UploadImageIcon from "icons/UploadImageIcon";
import { IconButton } from "components/shared";
import { useChat } from "store/chat/selectors";
import { STEP, TYPE_LIST } from "store/chat/type";
import { DataStatus } from "constant/enums";
import { useSnackbar } from "store/app/selectors";

const ChatDetailGroup = (props) => {
  const {
    typeList,
    dataTransfer,
    groupMembers,
    onSetStep,
    onLeftGroup,
    onSetTypeList,
    onFetchGroupMembersMember,
    onChangeGroupRole,
    onRemoveGroupMember,
  } = useChat();
  const commonT = useTranslations(NS_COMMON);
  
  const init = {
    statusPopup: false,
    title: "",
    content: <></>,
    actionType: 0,
  }
  const [showPopup, setShowPopup] = useState(init)
  const { onAddSnackbar } = useSnackbar();

  useEffect(() => {
    onFetchGroupMembersMember({
      roomId: dataTransfer?._id,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePopup = () => {
    setShowPopup(init)
  }

  const handleManageMember = async (action: 'addAdmin' | 'remove', member) => {
    if (action === 'addAdmin') {
      const result = await onChangeGroupRole({
        groupId: dataTransfer?._id,
        userIdToChange: member?._id,
        newRole: 'addOwner',
      }) as any;
      if (result?.error) {
        return onAddSnackbar(result?.error?.message, 'error');
      }
    } else {
      const result = await onRemoveGroupMember({
        groupId: dataTransfer?._id,
        userIdToKick: member?._id,
      }) as any;
      if (result?.error) {
        return onAddSnackbar(result?.error?.message, 'error');
      };
    }
    onAddSnackbar('Successfully!', 'success');
    onFetchGroupMembersMember({
      roomId: dataTransfer?._id,
    });
  }
  
  const handleConfirm = () => {
    console.log({ showPopup });
    if (showPopup.actionType === 1) {
      onLeftGroup({
        roomId: dataTransfer?._id,
      })
    } else {
      // remove
    }
    setShowPopup(init);
    onSetStep(STEP.CONVENTION);
    }
  const _renderContentPopup = () => {
    return (
      <Box sx={{
        margin: "10px auto",
      }}>
        <Box sx={{
          display: "flex",
          margin: "10px auto",
          justifyContent: "center",
        }}
        >
          <Box>
            {showPopup?.content}
          </Box>
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
            onClick={() => { setShowPopup(init) }}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            variant="primary"
            sx={defaultSx.buttonConfirm}
            type="button"
            size="small"
            onClick={() => handleConfirm()}
          >
            {commonT("form.confirm")}
          </Button>
        </Box>
      </Box>
    )
  }
  return (
    <>
      <Box sx={{
        margin: "10px"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Box sx={{
            position: "relative"
          }}>
            <Avatar
              alt="Avatar"
              size={80}
              style={{
                borderRadius: "10px",
                margin: 'auto'
              }}
            />
            <Box sx={{
              position: "absolute",
              bottom: 0,
              right: "-22px",
              boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
              cursor: "pointer",
              borderRadius: "50%",

            }}>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <Fab color="primary" size="small" component="span" aria-label="add"
                  sx={{
                    background: "#fff",
                    padding: "10px",
                    "&:hover": {
                      background: "#fff",
                    },
                  }}
                >
                  <UploadImageIcon />
                </Fab>
              </label>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          borderBottom: "1px solid #ECECF3",
          paddingBottom: "10px",
        }}>
          <ItemDetail
            text={`Group name: ${ dataTransfer?.name }`}
            icon={<GroupNameIcon />}
            iconClick={<EditGroupNameIcon />}
          />
          <ItemDetail
            text={'Media'}
            icon={<MediaFileIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST)
              onSetTypeList(TYPE_LIST.MEDIA_LIST)
            }}
          />
          <ItemDetail
            text={'Link'}
            icon={<LinkIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST)
              onSetTypeList(TYPE_LIST.LINK_LIST)
            }}
          />

          <ItemDetail
            text={'File'}
            icon={<FileGroupIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST)
              onSetTypeList(TYPE_LIST.FILE_LIST)
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
              {`Member (${dataTransfer?.usersCount })`}
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
          {groupMembers?.map((member, index) => (<ItemMemberDetail
            key={index}
            data={member}
            callbackAddAdmin={() => {
              handleManageMember('addAdmin', member);
            }}
            callbackRemove={() => {
              handleManageMember('remove', member);
            }}
            admin />))}
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
                    title: "Delete Group",
                    content: <>Are you sure to delete group?</>,
                    actionType: 0,
                  })
                }}
              >
                {"Delete group"}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="#F64E60" fontSize={14} fontWeight={600} sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPopup({
                    statusPopup: true,
                    actionType: 1,
                    title: "Leave Group",
                    content:
                      <Box sx={{
                        textAlign: "center"
                      }}>
                        <Typography>You won&apos;t be able to see the messages in this conversation</Typography>
                        <Typography>again after you leave the group. Please <span style={{ color: "var(--brand-primary, #3699FF)" }} >select a new admin</span></Typography>
                        <Typography>or the system will choose automatically</Typography>
                      </Box>
                    ,
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
        content={_renderContentPopup()}
        open={showPopup?.statusPopup}
        onClose={handlePopup}
        sx={{ width: "500px" }}
      />
    </>
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

export default ChatDetailGroup;


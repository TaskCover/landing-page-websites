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
import { useAuth, useSnackbar } from "store/app/selectors";

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
  const { user } = useAuth();
  //check owner
  const owners = Object.values(groupMembers).filter((item) =>
    item.roles.includes("owner"),
  );
  const owner = owners.some((obj) => obj._id === user?.id_rocket);

  const commonT = useTranslations(NS_COMMON);
  const TYPE_POPUP = {
    DELETE: "DELETE",
    LEAVE_AND_NEW_ADD: "LEAVE_AND_NEW_ADD",
    LEAVE_OWNER: "LEAVE_OWNER",
    LEAVE_MEMBER: "LEAVE_MEMBER",
    NEW_ADMIN: "NEW_ADMIN",
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
  const [userId, setUserId] = useState("");
  const { onAddSnackbar } = useSnackbar();
  const handleClosePopup = () => {
    setShowPopup(init);
  };

  useEffect(() => {
    onFetchGroupMembersMember({
      roomId: dataTransfer?._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManageMember = async (action: "addAdmin" | "remove", member) => {
    console.log({ user });

    if (action === "addAdmin") {
      const result = (await onChangeGroupRole({
        groupId: dataTransfer?._id,
        userIdToChange: member?._id,
        newRole: "addOwner",
      })) as any;
      if (result?.error) {
        return onAddSnackbar(result?.error?.message, "error");
      }
      (await onChangeGroupRole({
        groupId: dataTransfer?._id,
        userIdToChange: user?.id_rocket ?? "",
        newRole: "removeOwner",
      })) as any;
    } else {
      const result = (await onRemoveGroupMember({
        groupId: dataTransfer?._id,
        userIdToKick: member?._id,
      })) as any;
      if (result?.error) {
        return onAddSnackbar(result?.error?.message, "error");
      }
    }
    onAddSnackbar("Successfully!", "success");
    onFetchGroupMembersMember({
      roomId: dataTransfer?._id,
    });
  };

  const handleConfirm = () => {
    console.log({ showPopup });
    if (showPopup.actionType === 1) {
      onLeftGroup({
        roomId: dataTransfer?._id,
      });
    } else {
      // remove
    }
    setShowPopup(init);
    onSetStep(STEP.CONVENTION);
  };

  const _renderNewAdmin = () => {
    return (
      <>
        <Box sx={{ width: "100%", margin: "0 50px" }}>
          {groupMembers?.length > 0
            ? groupMembers
                .filter((m) => m._id !== user?.id_rocket)
                .map((item, index) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: 1,
                        // cursor: "pointer",
                        ":hover": {
                          backgroundColor: "#F7F7FD",
                        },
                      }}
                      p={1}
                      onClick={() => {
                        setUserId(item?._id);
                        setShowPopup((pre) => ({
                          ...pre,
                          type: TYPE_POPUP.LEAVE_AND_NEW_ADD,
                          statusPopup: true,
                          title: "Leave Group",
                          content: (
                            <Box
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography>
                                Leave group and select{" "}
                                <span
                                  style={{
                                    color: "var(--brand-primary, #3699FF)",
                                  }}
                                >
                                  {item?.fullname}
                                </span>{" "}
                                as new admin?
                              </Typography>
                            </Box>
                          ),
                        }));
                      }}
                      key={index}
                    >
                      <Avatar
                        src={item?.avatar}
                        alt="Avatar"
                        size={42}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="inherit" fontWeight="bold">
                          {item?.fullname}
                        </Typography>
                        <Typography variant="caption" color="#999999">
                          {item?.email}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
            : null}
        </Box>
      </>
    );
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
        {showPopup?.type !== TYPE_POPUP.NEW_ADMIN && (
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
              onClick={handlePopup}
            >
              {commonT("form.confirm")}
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  const handlePopup = async () => {
    const left = async () => {
      const leftResult = (await onLeftGroup({
        roomId: dataTransfer?._id,
      })) as any;
      if (leftResult?.error) {
        return onAddSnackbar(leftResult?.error?.message, "error");
      } else {
        onAddSnackbar("Successfully!", "success");
        onSetStep(STEP.CONVENTION);
      }
    };
    const addAndRemove = async (add: string, remove: string) => {
      const addOwnerResult = (await onChangeGroupRole({
        groupId: dataTransfer?._id,
        userIdToChange: add,
        newRole: "addOwner",
      })) as any;
      if (addOwnerResult?.error) {
        return onAddSnackbar(addOwnerResult?.error?.message, "error");
      }
      const removeOwner = (await onChangeGroupRole({
        groupId: dataTransfer?._id,
        userIdToChange: remove,
        newRole: "removeOwner",
      })) as any;
      if (removeOwner?.error) {
        return onAddSnackbar(removeOwner?.error?.message, "error");
      }
    };
    switch (showPopup?.type) {
      case TYPE_POPUP.DELETE:
        //CALL API DELETE
        break;
      case TYPE_POPUP.LEAVE_MEMBER:
        await left();
        break;
      case TYPE_POPUP.LEAVE_AND_NEW_ADD:
        await addAndRemove(userId, user?.id_rocket ?? "");
        await left();
        break;
      case TYPE_POPUP.LEAVE_OWNER:
        //NEW OWNER RANDOM
        const random = groupMembers
          ?.filter((m) => m._id !== user?.id_rocket)
          ?.pop()?._id;
        if (!random) return onAddSnackbar("Error!", "error"); // Handle delete group
        await addAndRemove(random, user?.id_rocket ?? "");
        await left();
        break;
      default:
        break;
    }
    setShowPopup(init);
  };
  const handleNewAdd = () => {
    setShowPopup((pre) => ({
      ...pre,
      type: TYPE_POPUP.NEW_ADMIN,
      statusPopup: true,
      title: "select a new admin",
      content: <>{_renderNewAdmin()}</>,
    }));
  };
  return (
    <>
      <Box
        sx={{
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Avatar
              alt="Avatar"
              size={80}
              style={{
                borderRadius: "10px",
                margin: "auto",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: "-22px",
                boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            >
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <Fab
                  color="primary"
                  size="small"
                  component="span"
                  aria-label="add"
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
        <Box
          sx={{
            borderBottom: "1px solid #ECECF3",
            paddingBottom: "10px",
          }}
        >
          <ItemDetail
            text={`Group name: ${dataTransfer?.name}`}
            icon={<GroupNameIcon />}
            iconClick={<EditGroupNameIcon />}
          />
          <ItemDetail
            text={"Media"}
            icon={<MediaFileIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST);
              onSetTypeList(TYPE_LIST.MEDIA_LIST);
            }}
          />
          <ItemDetail
            text={"Link"}
            icon={<LinkIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST);
              onSetTypeList(TYPE_LIST.LINK_LIST);
            }}
          />

          <ItemDetail
            text={"File"}
            icon={<FileGroupIcon />}
            iconClick={<ArrowRightIcon />}
            onClick={() => {
              onSetStep(STEP.LIST);
              onSetTypeList(TYPE_LIST.FILE_LIST);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="#212121"
              fontSize={16}
              fontWeight={600}
            >
              {`Member (${dataTransfer?.usersCount})`}
            </Typography>
          </Box>
          <Box>
            {/* <Typography variant="caption" color="#3699FF" fontSize={14} fontWeight={600} sx={{ cursor: "pointer" }}>
              See more
            </Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            height: "180px",
            overflow: "auto",
          }}
        >
          {groupMembers?.map((member, index) => (
            <ItemMemberDetail
              key={index}
              data={member}
              callbackAddAdmin={() => {
                handleManageMember("addAdmin", member);
              }}
              callbackRemove={() => {
                handleManageMember("remove", member);
              }}
              admin
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            {owner && (
              <Box sx={{ marginBottom: 1 }}>
                <Typography
                  variant="caption"
                  color="#F64E60"
                  fontSize={14}
                  fontWeight={600}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.DELETE,
                      statusPopup: true,
                      title: "Delete Group",
                      content: <>Are you sure to delete group?</>,
                      actionType: 0,
                    }));
                  }}
                >
                  {"Delete group"}
                </Typography>
              </Box>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                color="#F64E60"
                fontSize={14}
                fontWeight={600}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (owner) {
                    setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.LEAVE_OWNER,
                      statusPopup: true,
                      title: "Leave Group",
                      content: (
                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography>
                            You won&apos;t be able to see the messages in this
                            conversation
                          </Typography>
                          <Typography>
                            again after you leave the group. Please{" "}
                            <span
                              style={{
                                color: "var(--brand-primary, #3699FF)",
                                cursor: "pointer",
                              }}
                              onClick={handleNewAdd}
                            >
                              select a new admin
                            </span>
                          </Typography>
                          <Typography>
                            or the system will choose automatically
                          </Typography>
                        </Box>
                      ),
                    }));
                  } else {
                    setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.LEAVE_MEMBER,
                      statusPopup: true,
                      title: "Leave Group",
                      content: <>Are you sure to leave group?</>,
                    }));
                  }
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
        onClose={handleClosePopup}
        sx={{ width: showPopup?.widthPopup }}
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

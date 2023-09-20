import DrawerInfoChat from "../Drawer";
import GroupNameIcon from "icons/GroupNameIcon";
import { TYPE_POPUP } from "components/sn-chat/chatGroup/ChatDetailGroup";
import ItemMemberDetail from "components/sn-chat/chatGroup/ItemMemberDetail";

import { Box, Typography } from "@mui/material";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";
import { useTranslations } from "next-intl";
import { NS_CHAT_BOX } from "constant/index";
import DefaultPopupLayout from "components/sn-time-tracking/TimeTrackingModal/DefaultPopupLayout";
import { useChat } from "store/chat/selectors";
import { useAuth } from "store/app/selectors";
import { ChangeEvent, FC } from "react";
import { ChatDetailInfoProps } from ".";

interface ChatDetailGroupProps extends Partial<ChatDetailInfoProps> {
  handleNewAdd: () => void;
  handleChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClosePopup: () => void;
  handleManageMember: (action: "addAdmin" | "remove", member: any) => any;
  _renderContentPopup: () => JSX.Element;
  showPopup: any;
  setShowPopup: any;
}

const ChatDetailGroup: FC<ChatDetailGroupProps> = (props) => {
  const commonChatBox = useTranslations(NS_CHAT_BOX);

  const { user } = useAuth();

  const { groupMembers } = useChat();


  //check owner
  const owners = Object.values(groupMembers).filter((item) =>
    item.roles.includes("owner"),
  );
  const owner = owners.some((obj) => obj._id === user?.id_rocket);

  return (
    <>
      <ChatDetailInfoMenuItem
        text={"Group Name: " + props.currentConversation?.name}
        icon={GroupNameIcon}
        isOpenDrawer={props?.isDrawerOpen as boolean}
        currentConversation={props?.currentConversation as any}
      />
      <Box
        sx={{
          padding: "12px 0",
          border: "1px solid #ECECF3",
          borderRight: "none",
          borderLeft: "none",
          width: "100%",
        }}
      >
        {(props?.menuItems as any[])
          .filter((item) => item.type !== "account")
          .map((item, index) => (
            <ChatDetailInfoMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              isOpenDrawer={props?.isDrawerOpen as boolean}
              currentConversation={props?.currentConversation as any}
              onOpenDrawer={props?.onOpenDrawer}
              callBackOpenDrawer={item.callback}
            />
          ))}
      </Box>
      <Box
        sx={{
          height: "180px",
          overflow: "auto",
          width: '100%'
        }}
      >
        {groupMembers?.map((member, index) => (
          <ItemMemberDetail
            key={index}
            data={member}
            callbackAddAdmin={() => {
              props?.handleManageMember("addAdmin", member);
            }}
            callbackRemove={() => {
              props?.handleManageMember("remove", member);
            }}
            admin={owner}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: '100%'

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
                  props?.setShowPopup((pre) => ({
                    ...pre,
                    type: TYPE_POPUP.DELETE,
                    statusPopup: true,
                    title: commonChatBox("chatBox.deleteGroup"),
                    content: <>{commonChatBox("chatBox.sureRemoveGroup")}</>,
                    actionType: 0,
                  }));
                }}
              >
                {commonChatBox("chatBox.deleteGroup")}
              </Typography>
            </Box>
          )}
          {groupMembers.length > 1 && (
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                color="#F64E60"
                fontSize={14}
                fontWeight={600}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (owner) {
                    props?.setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.LEAVE_OWNER,
                      statusPopup: true,
                      title: commonChatBox("chatBox.leaveGroup"),
                      content: (
                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography>
                            {commonChatBox("chatBox.leaveGroupConfirm.text_1")}
                          </Typography>
                          <Typography>
                            {commonChatBox("chatBox.leaveGroupConfirm.text_2")}{" "}
                            <span
                              style={{
                                color: "var(--brand-primary, #3699FF)",
                                cursor: "pointer",
                              }}
                              onClick={props?.handleNewAdd}
                            >
                              {commonChatBox("chatBox.selectAdminNew")}
                            </span>
                          </Typography>
                          <Typography>
                            {commonChatBox("chatBox.leaveGroupConfirm.text_3")}
                          </Typography>
                        </Box>
                      ),
                    }));
                  } else {
                    props?.setShowPopup((pre) => ({
                      ...pre,
                      type: TYPE_POPUP.LEAVE_MEMBER,
                      statusPopup: true,
                      title: commonChatBox("chatBox.leaveGroup"),
                      content: <>{commonChatBox("chatBox.sureLeaveGroup")}</>,
                    }));
                  }
                }}
              >
                {commonChatBox("chatBox.leaveGroup")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <DefaultPopupLayout
        title={props?.showPopup?.title}
        content={props?._renderContentPopup()}
        open={props?.showPopup?.statusPopup}
        onClose={props?.handleClosePopup}
        sx={{ width: props?.showPopup?.widthPopup }}
      />
    </>
  );
};

export default ChatDetailGroup;

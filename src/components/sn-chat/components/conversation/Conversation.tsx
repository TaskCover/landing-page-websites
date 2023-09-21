import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "store/chat/selectors";
import { useAuth, useSnackbar } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../chat/ChatInput";
import Messages from "../messages/Messages";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";

const initPageIndex = 10;

interface Props {
  wrapperMessageSx?: any;
}
const Conversation: FC<Props> = ({ wrapperMessageSx }) => {
  const {
    roomId,
    conversationInfo,
    convention,
    messageInfo,
    messagePaging: { pageIndex, pageSize },
    messageStatus,
    mediaListConversation,
    stateSendMessage,
    dataTransfer,
    stateSearchMessage,
    unReadMessage,
    onGetUnReadMessages,
    onGetLastMessages,
    onUploadAndSendFile,
  } = useChat();
  const { user } = useAuth();

  const { sendMessage } = useWSChat();

  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);
  const [files, setFiles] = useState<File[]>([]);
  const account = convention?.find((item) => item._id === roomId);
  const isGroup = useMemo(
    () => conversationInfo?.t !== "d",
    [conversationInfo?.t],
  );
  const unReadMessageClone = useMemo(
    () =>
      unReadMessage?.info.filter(
        (item) => item.username !== user?.["username"],
      ) || [],
    [unReadMessage?.info, user],
  );
  

  const getLastMessage = useCallback(
    async (page?: number, size?: number) => {       
      try {
        await onGetLastMessages({
          roomId: dataTransfer?._id ?? roomId,
          type: dataTransfer?.t ?? "d",
          offset: page,
          count: size,
        });
      } catch (error) {
        onAddSnackbar(
          typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
          "error",
        );
      }
    },
    [dataTransfer, onAddSnackbar, onGetLastMessages, roomId, t],
  );

  const getUnReadMessage = useCallback(async () => {
    await onGetUnReadMessages({
      type: dataTransfer?.t ?? "d",
    });
  }, [dataTransfer?.t, onGetUnReadMessages]);

  console.log(dataTransfer, 'dataTransfer');
  
  useEffect(() => {
    const countNew = stateSearchMessage?.offset
      ? stateSearchMessage?.offset + initPageIndex
      : initPageIndex;        
    if((!roomId || roomId?.length === 0) && !dataTransfer?._id) return;
    getLastMessage(0, countNew);
    if (inputRef.current) {
      inputRef.current.pageRef.current = countNew - initPageIndex;
      inputRef.current.scrollMessage();
    }
  }, [roomId, dataTransfer?._id, getLastMessage, stateSearchMessage, t]);

  useEffect(() => {
    if (stateSendMessage.status) {
      setFiles([]);
    }
  }, [stateSendMessage.status]);

  useEffect(() => {
    getUnReadMessage();
  }, [getUnReadMessage]);

  type MessageHandle = React.ElementRef<typeof Messages>;
  const inputRef = useRef<MessageHandle>(null);

  const handleSendMessage = useCallback(
    async (message: string) => {
      sendMessage({ message });
      inputRef?.current?.clearScrollContentMessage();
      if (files.length > 0) {
        await onUploadAndSendFile({
          endpoint: "files/upload-link",
          files,
        });
      }
    },
    [
      files,
      onUploadAndSendFile,
      sendMessage,
    ],
  );
  
  return (
    <>
      <Messages
        pageIndex={pageIndex}
        pageSize={pageSize}
        sessionId={user?.["username"]}
        isGroup={isGroup}
        avatarPartner={conversationInfo?.avatar ?? account?.avatar ?? undefined}
        initialMessage={messageInfo}
        mediaListPreview={mediaListConversation}
        stateMessage={stateSendMessage}
        statusLoadMessage={messageStatus}
        focusMessage={stateSearchMessage}
        unReadMessage={unReadMessageClone}
        onRefetch={(page) => {
          getLastMessage(page, 10);
        }}
        ref={inputRef}
        wrapperMessageSx={wrapperMessageSx}
      />
      <ChatInput
        isLoading={false}
        onEnterMessage={handleSendMessage}
        files={files}
        onChangeFiles={(file) => setFiles(file)}
        onResize={() => {
          if (inputRef?.current?.isBottomScrollMessage) {
            inputRef?.current?.clearScrollContentMessage();
            inputRef?.current?.initScrollIntoView();
          }
        }}
      />
    </>
  );
};

export default Conversation;

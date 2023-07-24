import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "store/chat/selectors";
import { useAuth } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../chat/ChatInput";
import { STEP } from "store/chat/type";
import Messages from "../messages/Messages";

const Conversation = () => {
  const {
    backFallStep,
    roomId,
    conversationInfo,
    convention,
    messageInfo,
    messagePaging: { pageIndex, pageSize },
    stateSendMessage,
    dataTransfer,
    onGetLastMessages,
    onUploadAndSendFile,
  } = useChat();
  const { user } = useAuth();
  const { sendMessage } = useWSChat();
  const [files, setFiles] = useState<File[]>([]);

  const account = convention?.find((item) => item._id === roomId);

  useEffect(() => {    
    if (backFallStep !== STEP.VIEW_DETAIL_USER) {
      onGetLastMessages({ roomId: dataTransfer?._id ?? roomId, type: dataTransfer?.t ?? 'd', offset: 0, count: 10 });
    }
  }, [roomId, onGetLastMessages, backFallStep, dataTransfer?._id, dataTransfer?.t]);

  useEffect(() => {
    if (stateSendMessage.status) {
      setFiles([]);
    }
  }, [stateSendMessage.status]);

  type MessageHandle = React.ElementRef<typeof Messages>;
  const inputRef = useRef<MessageHandle>(null);

  const handleSendMessage = useCallback(
    async (message: string) => {
      inputRef?.current?.scrollBottom();
      inputRef?.current?.resetHeightScroll();
      sendMessage({ message });
      if (files.length > 0) {
        await onUploadAndSendFile({
          endpoint: "files/upload-link",
          files,
        });
      }
    },
    [files, onUploadAndSendFile, sendMessage],
  );

  const fetchLastMessage = useCallback(
    (page: number) => {
      onGetLastMessages({ roomId: dataTransfer?._id ?? roomId, type: dataTransfer?.t ?? 'd', offset: page, count: 10 });
    },
    [dataTransfer?._id, dataTransfer?.t, onGetLastMessages, roomId],
  );

  return (
    <>
      <Messages
        sessionId={user?.["username"]}
        avatarPartner={conversationInfo?.avatar ?? account?.avatar ?? undefined}
        pageNumber={pageIndex}
        pageSize={pageSize}
        initialMessage={messageInfo}
        stateMessage={stateSendMessage}
        onRefetch={(page) => {
          fetchLastMessage(page);
        }}
        ref={inputRef}
      />
      <ChatInput
        isLoading={false}
        onEnterMessage={handleSendMessage}
        files={files}
        onChangeFiles={(file) => setFiles(file)}
      />
    </>
  );
};

export default Conversation;

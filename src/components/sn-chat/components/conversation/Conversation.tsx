import { useCallback, useEffect, useState } from "react";
import { useChat } from "store/chat/selectors";
import Messages from "./Messages";
import { useAuth } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../common/ChatInput";
import { STEP } from "store/chat/type";

const Conversation = () => {
  const {
    backFallStep,
    roomId,
    conversationInfo,
    convention,
    messageInfo,
    messagePaging: { pageIndex, pageSize },
    stateSendMessage,
    onGetLastMessages,
    onUploadAndSendFile,
  } = useChat();
  const { user } = useAuth();
  const { sendMessage } = useWSChat();
  const [files, setFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  const account = convention?.find((item) => item._id === roomId);

  useEffect(() => {
    if (backFallStep !== STEP.VIEW_DETAIL_USER) {
      onGetLastMessages({ roomId, type: "d", offset: 0, count: 10 });
    }
  }, [roomId, onGetLastMessages, backFallStep]);

  useEffect(() => {
    if (stateSendMessage.status) {
      setFiles([]);
    }
  }, [stateSendMessage.status]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      sendMessage({ message });
      if (files.length > 0) {
        await onUploadAndSendFile({
          endpoint: "files/upload-link",
          files,
        });
      }
      setIsSending((prev) => !prev);
    },
    [files, onUploadAndSendFile, sendMessage],
  );

  const fetchLastMessage = useCallback(
    (page: number) => {
      onGetLastMessages({ roomId, type: "d", offset: page, count: 10 });
    },
    [onGetLastMessages, roomId],
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

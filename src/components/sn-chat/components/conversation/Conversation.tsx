import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "store/chat/selectors";
import { useAuth } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../chat/ChatInput";
import Messages from "../messages/Messages";

const Conversation = () => {
  const {
    roomId,
    conversationInfo,
    convention,
    messageInfo,
    messagePaging: { pageIndex, pageSize },
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
  const [files, setFiles] = useState<File[]>([]);

  const account = convention?.find((item) => item._id === roomId);

  const getLastMessage = useCallback(
    async (page?: number, size?: number) => {
      await onGetLastMessages({
        roomId: dataTransfer?._id ?? roomId,
        type: dataTransfer?.t ?? "d",
        offset: page,
        count: size,
      });
    },
    [dataTransfer?._id, dataTransfer?.t, onGetLastMessages, roomId],
  );

  const getUnReadMessage = useCallback(async () => {
    await onGetUnReadMessages({
      type: dataTransfer?.t ?? "d",
    });
  }, [dataTransfer?.t, onGetUnReadMessages]);

  useEffect(() => {
    const countNew = stateSearchMessage?.offset
      ? stateSearchMessage?.offset + 10
      : 10;
    getLastMessage(0, countNew);
    if (inputRef.current) {
      inputRef.current.pageRef.current = countNew;
      inputRef.current.scrollMessage();
    }
  }, [roomId, dataTransfer, getLastMessage, stateSearchMessage]);

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
      inputRef?.current?.scrollBottom();
      if (files.length > 0) {
        await onUploadAndSendFile({
          endpoint: "files/upload-link",
          files,
        });
      }
    },
    [files, onUploadAndSendFile, sendMessage],
  );

  return (
    <>
      <Messages
        pageIndex={pageIndex}
        pageSize={pageSize}
        sessionId={user?.["username"]}
        avatarPartner={conversationInfo?.avatar ?? account?.avatar ?? undefined}
        initialMessage={messageInfo}
        stateMessage={stateSendMessage}
        focusMessage={stateSearchMessage}
        unReadMessage={unReadMessage}
        onRefetch={(page) => {
          getLastMessage(page, 10);
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

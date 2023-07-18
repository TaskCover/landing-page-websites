import { useCallback, useEffect } from "react";
import { useChat } from "store/chat/selectors";
import Messages from "./Messages";
import { useAuth } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../common/ChatInput";
import { STEP } from "store/chat/type";
import { uploadFile } from "store/chat/media/actionMedia";
import { client } from "api";
import { Attachment } from "store/chat/media/typeMedia";

const Conversation = () => {
  const {
    backFallStep,
    roomId,
    conversationInfo,
    convention,
    messageInfo,
    messagePaging: { pageIndex },
    onGetLastMessages,
  } = useChat();
  const { user } = useAuth();
  const { sendMessage } = useWSChat();
  const account = convention?.find((item) => item._id === roomId);

  useEffect(() => {
    if (backFallStep !== STEP.VIEW_DETAIL_USER) {
      onGetLastMessages({ roomId, type: "d", offset: 0, count: 10 });
    }
  }, [roomId, onGetLastMessages, backFallStep]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const fetchLastMessage = useCallback(
    (page: number) => {
      if (backFallStep !== STEP.VIEW_DETAIL_USER) {
        onGetLastMessages({ roomId, type: "d", offset: page, count: 10 });
      }
    },
    [backFallStep, onGetLastMessages, roomId],
  );

  const handleImportFile = useCallback(async (files: File[]) => {
    console.log(files);
    // const urlFile = await uploadFile("files/upload-link", files[0]);

    // console.log(urlFile);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: any[] = [];
    const attachmentImages: Attachment[] = [];

    for (let index = 0; index < files.length; index++) {
      // promises.push(uploadFile("files/upload-link", files[index]));
      promises.push(files[index].name);
    }

    const urlFiles = await Promise.all(promises);
    urlFiles.forEach(({ url }) => {
      attachmentImages.push({
        image_url: url as string,
      });
    });
  }, []);

  return (
    <>
      <Messages
        sessionId={user?.["username"]}
        avatarPartner={conversationInfo?.avatar ?? account?.avatar ?? undefined}
        pageNumber={pageIndex}
        initialMessage={messageInfo}
        onRefetch={(page) => {
          if (page > 1) {
            fetchLastMessage(page - 1);
          }
        }}
      />
      <ChatInput
        isLoading={false}
        onEnterMessage={handleSendMessage}
        onChangeFiles={handleImportFile}
      />
    </>
  );
};

export default Conversation;

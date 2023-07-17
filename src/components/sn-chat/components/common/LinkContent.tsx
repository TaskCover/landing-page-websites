import { DataStatus } from "constant/enums";
import { useEffect, useMemo } from "react";
import { useAuth } from "store/app/selectors";
import { ChatLinkType } from "store/chat/media/typeMedia";
import { useChat } from "store/chat/selectors";

const LinkItem = ({ linkInfo }: { linkInfo: ChatLinkType }) => {
  const { urls } = linkInfo || {};
  return <>Item</>;
};

const LinkContent = () => {
  const { user } = useAuth();
  const { chatLinks, chatLinksStatus, conversationInfo, onGetChatUrls } =
    useChat();

  const { avatar, t } = conversationInfo || {};
  console.log("conversationInfo", chatLinks);

  //   const listLink = useMemo(() => {

  //   }, [])

  useEffect(() => {
    onGetChatUrls();
  }, [onGetChatUrls]);
  return (
    <>
      {chatLinksStatus === DataStatus.LOADING ||
      chatLinksStatus === DataStatus.FAILED ? (
        <>Loading...</>
      ) : (
        chatLinks?.map((item) => {
          return <LinkItem key={item.messageId} linkInfo={item} />;
        })
      )}
    </>
  );
};

export default LinkContent;

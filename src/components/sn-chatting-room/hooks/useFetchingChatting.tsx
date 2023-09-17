import { useEffect, useMemo, useState } from "react";
import { ParamChatState, ParamState } from "../type";
import useChattingActions from "./useChattingActions";
import { IChatItemInfo, STEP } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import useGetScreenMode from "hooks/useGetScreenMode";

const defaultParam = {
  count: 12,
  offset: 0,
  text: "",
  type: "a",
};

const defaultChatParam = {
  ...defaultParam,
  roomId: "",
};

export interface useFetchingChattingReturns {
  onSelectRoom: (chatInfo: IChatItemInfo) => void;
  currentConversation?: IChatItemInfo;
  onResetCurrentConversation?: () => void;
  onSearchText: (text?: string) => void;
}

const useFetchingChatting = (): useFetchingChattingReturns => {
  const { conversations, handleGetConversation } = useChattingActions();
  const { onSetStep } = useChat();
  const [params, setParams] = useState<ParamState>(defaultParam as ParamState);
  const [detailParams, setDetailsParams] = useState<ParamChatState>(
    defaultChatParam as ParamChatState,
  );
  const { mobileMode } = useGetScreenMode();

  const onResetCurrentConversation = () => {
    setDetailsParams({ ...detailParams, roomId: "-1" });
    return onResetCurrentConversation;
  };

  useEffect(() => {
    handleGetConversation({ body: params });
  }, [handleGetConversation, params]);

  useEffect(() => {
    if (mobileMode) return;
    if (conversations?.length > 0) {
      onSelectRoom(conversations[0]);
    }
  }, [conversations]);

  const onSelectRoom = (chatInfo: IChatItemInfo) => {
    setDetailsParams((prevState) => ({
      ...prevState,
      roomId: chatInfo?._id,
    }));
    if (chatInfo?.t !== "d") {
      onSetStep(STEP.CHAT_GROUP, chatInfo);
    } else {
      onSetStep(STEP.CHAT_ONE, chatInfo);
    }
  };

  const currentConversation = useMemo(() => {
    if (detailParams?.roomId) {
      return conversations.find(
        (conversation) => conversation?._id === detailParams?.roomId,
      );
    }
  }, [detailParams?.roomId, conversations]);

  return {
    onSelectRoom,
    currentConversation,
    onResetCurrentConversation,
    onSearchText: (text) => setParams({ ...params, text: text as string }),
  };
};

export default useFetchingChatting;

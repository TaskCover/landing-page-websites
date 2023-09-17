import { useEffect, useMemo, useState } from "react";
import { ParamChatState, ParamState } from "../type";
import useChattingActions from "./useChattingActions";
import { DirectionChat, IChatItemInfo, STEP } from "store/chat/type";
import { useChat } from "store/chat/selectors";

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
<<<<<<< Updated upstream
  onSelectRoom: (chatInfo: IChatItemInfo) => void;
  currentConversation?: IChatItemInfo;
  onSearchText: (text?: string) => void;
=======
    onSelectRoom: (chatInfo: IChatItemInfo) => void
    currentConversation?: IChatItemInfo;
    onSearchText: (text?: string) => void;
>>>>>>> Stashed changes
}

const useFetchingChatting = (): useFetchingChattingReturns => {
  const { conversations, handleGetConversation } = useChattingActions();
  const { onSetStep } = useChat();
  const [params, setParams] = useState<ParamState>(defaultParam as ParamState);
  const [detailParams, setDetailsParams] = useState<ParamChatState>(
    defaultChatParam as ParamChatState,
  );

  useEffect(() => {
    handleGetConversation({ body: params });
  }, [handleGetConversation, params]);

  useEffect(() => {
    if (conversations?.length > 0) {
      onSelectRoom(conversations[0]);
    }
  }, [conversations]);

<<<<<<< Updated upstream
  const onSelectRoom = (chatInfo: IChatItemInfo) => {
    setDetailsParams((prevState) => ({
      ...prevState,
      roomId: chatInfo?._id,
    }));
    if (chatInfo?.t !== "d") {
      onSetStep(STEP.CHAT_GROUP, chatInfo);
    } else {
      onSetStep(STEP.CHAT_ONE, chatInfo);
=======
    const currentConversation = useMemo(() => {
        if(detailParams?.roomId){
            return conversations.find(conversation => conversation?._id === detailParams?.roomId)
        }
    }, [detailParams?.roomId, conversations])
    
    useEffect(() => {
        // onSetRoomId(detailParams.roomId)
    }, [detailParams.roomId])

    return {
        onSelectRoom,
        currentConversation,
        onSearchText: (text) => setParams({...params, text: text as string})
>>>>>>> Stashed changes
    }
  };

  const currentConversation = useMemo(() => {
    if (detailParams?.roomId) {
      return conversations.find(
        (conversation) => conversation?._id === detailParams?.roomId,
      );
    }
  }, [detailParams?.roomId, conversations]);

  useEffect(() => {
    // onSetRoomId(detailParams.roomId)
  }, [detailParams.roomId]);

  return {
    onSelectRoom,
    currentConversation,
    onSearchText: (text) => setParams({ ...params, text: text as string }),
  };
};

export default useFetchingChatting;

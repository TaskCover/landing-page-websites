import { useEffect, useMemo, useState } from "react"
import { ParamChatState, ParamState } from "../type"
import useChattingActions from "./useChattingActions"
import { IChatItemInfo } from "store/chat/type"
import { useChat } from "store/chat/selectors"

const defaultParam = {
    count: 12,
    offset: 0,
    text: '',
    type: 'd'
}

const defaultChatParam = {
    ...defaultParam,
    type: 'd',
    roomId: ''
}

export interface useFetchingChattingReturns {
    onSelectRoom: (roomId: string) => void;
    currentConversation?: IChatItemInfo
}

const useFetchingChatting = (): useFetchingChattingReturns => {
    const { conversations, handleGetDetailConversation, handleGetConversation, onGetUnReadMessages } = useChattingActions()

    const {onSetRoomId} = useChat()
    const [params, setParams] = useState<ParamState>(defaultParam as ParamState)
    const [detailParams, setDetailsParams] = useState<ParamChatState>(defaultChatParam as ParamChatState)


    useEffect(() => {
        handleGetConversation({ body: params });
      }, [handleGetConversation, params]);
      
    useEffect(() => {
        if(detailParams?.roomId?.length > 0){            
          handleGetDetailConversation({
            ...detailParams,
          });
        }
    }, [detailParams])

    useEffect(() => {
        if(conversations?.length > 0){
            onSelectRoom(conversations[0]?._id)
        }
    }, [conversations])

    useEffect(() => {
        onGetUnReadMessages && onGetUnReadMessages({ type: 'd' })
    }, [onGetUnReadMessages])
    const onSelectRoom = (roomId: string) => {
        setDetailsParams((prevState) => ({
            ...prevState,
            roomId
        }));
    }

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
        currentConversation
    }
}

export default useFetchingChatting;
import { useEffect, useMemo, useState } from "react"
import { ParamChatState, ParamState } from "../type"
import useChattingActions from "./useChattingActions"
import { IChatItemInfo } from "store/chat/type"

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
    const { conversations, handleGetConversation } = useChattingActions()

    const [params, setParams] = useState<ParamState>(defaultParam as ParamState)
    const [detailParams, setDetailsParams] = useState<ParamChatState>(defaultChatParam as ParamChatState)


    useEffect(() => {
        handleGetConversation({ body: params });
      }, [handleGetConversation, params]);
      
    useEffect(() => {
        if(conversations?.length > 0){
            onSelectRoom(conversations[0]?._id)
        }
    }, [conversations])

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
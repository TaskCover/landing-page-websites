import { useEffect, useMemo, useState } from "react"
import { ParamChatState, ParamState } from "../type"
import useChattingActions from "./useChattingActions"

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

const useFetchingChatting = () => {
    const { conversations, handleGetDetailConversation, handleGetConversation } = useChattingActions()

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
    
    return {
        onSelectRoom,
        currentConversation
    }
}

export default useFetchingChatting;
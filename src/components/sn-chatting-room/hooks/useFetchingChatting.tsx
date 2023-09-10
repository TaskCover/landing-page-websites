import { useEffect, useState } from "react"
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
    const [selectedRoomId, setSelectedRoomId] = useState<string>()


    useEffect(() => {
        handleGetConversation({body: params});
      }, [handleGetConversation, params]);

    useEffect(() => {
        if(conversations?.length > 0  && selectedRoomId){
          handleGetDetailConversation({
            ...detailParams,
            roomId: selectedRoomId ? selectedRoomId : conversations[0]?._id 
          });
        }
      }, [detailParams, handleGetDetailConversation, conversations, selectedRoomId])
    

}

export default useFetchingChatting;
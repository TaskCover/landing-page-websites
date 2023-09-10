import { useEffect } from "react";
import useChattingActions from "./useChattingActions";
import { DirectionChat } from "store/chat/type";


const useRouteChatDetails = () => {
    const { conversations, handleGetDetailConversation, currentPath, currentConversation, defaultParam } = useChattingActions()

    useEffect(() => {
        if (currentPath === 'chat' && conversations[0]?._id) {
            handleGetDetailConversation({
                ...defaultParam,
                type: conversations[0].t as DirectionChat,
                roomId: conversations[0]?._id
            })
        }
    }, [currentPath, conversations, currentConversation, handleGetDetailConversation, defaultParam])
}

export default useRouteChatDetails;
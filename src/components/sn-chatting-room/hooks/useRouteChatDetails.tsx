import { useRouter } from "next-intl/client";
import { useEffect } from "react";
import useChattingActions from "./useChattingActions";
import { CHATTING_ROOM_PATH } from "constant/paths";
import { DirectionChat } from "store/chat/type";


const useRouteChatDetails = () => {
    const { push } = useRouter()
    const { conversations, handleGetDetailConversation, currentPath, currentConversation, defaultParam } = useChattingActions()

    useEffect(() => {
        if (currentPath === 'chat' && conversations[0]?._id) {
            push(`${CHATTING_ROOM_PATH}/${(conversations[0]?._id)}`)
            handleGetDetailConversation({
                ...defaultParam,
                type: conversations[0].t as DirectionChat,
                roomId: conversations[0]?._id
            })
        } else {
            if (currentConversation && currentPath) {
                handleGetDetailConversation({
                    ...defaultParam,
                    type: currentConversation.t as DirectionChat,
                    roomId: currentPath
                })
            }
        }
    }, [currentPath, conversations, currentConversation])
}

export default useRouteChatDetails;
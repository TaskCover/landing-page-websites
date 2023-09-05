import { usePathname, useRouter } from "next-intl/client";
import { useEffect, useMemo } from "react";
import useChattingActions from "./useChattingActions";
import { CHATTING_ROOM_PATH } from "constant/paths";


const useRouteChatDetails = () => {
    const pathname = usePathname();
    const { push } = useRouter()
    const currentPath = useMemo(() => pathname.split('/').pop(), [pathname])
    const { conversations } = useChattingActions()

    useEffect(() => {
        if (currentPath === 'chat' && conversations[0]?._id) {
            push(`${CHATTING_ROOM_PATH}/${(conversations[0]?._id)}`)
        }
    }, [currentPath, conversations])
}

export default useRouteChatDetails;
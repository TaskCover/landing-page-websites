import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useCallback, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";
import { DirectionChat } from "store/chat/type";

// This hook only contains event actions not included useEffect 

const defaultParam = {
    count: 12,
    offset: 0,
    text: '',
    type: 'a' as DirectionChat
}

interface ParamState {
    type: DirectionChat,
    text: string,
    offset: number,
    count: number
}

interface ParamChatState extends ParamState {
    roomId: string
}

const useChattingActions = () => {
    const { onGetAllConvention, convention, isFetching, onGetLastMessages, messageInfo } = useChat();
    const { onAddSnackbar } = useSnackbar()
    const t = useTranslations(NS_COMMON);
    const pathname = usePathname()
    const currentIdChat = pathname.split('/').pop || ''

    const [params, setParams] = useState<ParamState>(defaultParam)


    const handleGetConversation = useCallback(async (body?: ParamState) => {
        if (!body) body = params
        const { type, text, offset, count } = body
        try {
            await onGetAllConvention({
                type,
                text,
                offset: offset,
                count: count,
            });
        } catch (error) {
            onAddSnackbar(
                typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
                "error",
            );
        }
    },
        [onAddSnackbar, onGetAllConvention, params, t],
    );

    const handleGetDetailConversation = (props: ParamChatState) => {
        onGetLastMessages(props)
    }

    return {
        handleGetConversation,
        handleGetDetailConversation,
        conversations: convention,
        loading: isFetching,
        detailsMessage: messageInfo,
    }
}

export default useChattingActions
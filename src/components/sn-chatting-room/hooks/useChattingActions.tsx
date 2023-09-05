import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";
import { DirectionChat } from "store/chat/type";

// This hook only contains event actions not included useEffect 

interface ParamState {
    type: DirectionChat,
    text: string,
    offset: number,
    count: number
}

const useChattingActions = () => {
    const { onGetAllConvention, convention, isFetching } = useChat();
    const { onAddSnackbar } = useSnackbar()
    const t = useTranslations(NS_COMMON);

    const [params, setParams] = useState<ParamState>({
        count: 12,
        offset: 0,
        text: '',
        type: 'a'
    })


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

    return {
        handleGetConversation,
        conversations: convention,
        loading: isFetching
    }
}

export default useChattingActions
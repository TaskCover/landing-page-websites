import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";
import { ParamChatState, ParamState } from "../type";
// This hook only contains event actions not included useEffect 


const useChattingActions = () => {
    const { onGetAllConvention, convention, isFetching, onGetLastMessages, messageInfo } = useChat();
    const { onAddSnackbar } = useSnackbar()
    const t = useTranslations(NS_COMMON);


    const handleGetConversation = useCallback(async ({ body }: { body: ParamState }) => {        
        try {
            await onGetAllConvention({
            ...body 
            });
        } catch (error) {
            onAddSnackbar(
                typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
                "error",
            );
        }
    },
        [onAddSnackbar, onGetAllConvention, t],
    );


    const handleGetDetailConversation = useCallback((props: ParamChatState) => {
        if (props?.roomId?.length > 0 && props?.roomId) {
            onGetLastMessages(props)
        }
    }, [onGetLastMessages])


    return {
        handleGetConversation,
        handleGetDetailConversation,
        conversations: convention,
        loading: isFetching,
        detailsMessage: messageInfo,
    }
}

export default useChattingActions

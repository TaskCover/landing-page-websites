import { useCallback, useEffect, useState } from "react";
import { ParamState } from "../type";
import { useChat } from "store/chat/selectors";
import useGetScreenMode from "hooks/useGetScreenMode";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";

const defaultParam = {
  count: 12,
  offset: 0,
  text: "",
  type: "a",
};

export interface useFetchingChattingReturns {
  onSearchText: (text?: string) => void;
  onChangeParamsConversation: (params: ParamState) => void
}

const useFetchingChatting = (): useFetchingChattingReturns => {
  const [params, setParams] = useState<ParamState>(defaultParam as ParamState);
  const { onGetAllConvention, convention: conversations, onSetDataTransfer: onSelectRoom, dataTransfer } = useChat();

  const { mobileMode } = useGetScreenMode();

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
  

  useEffect(() => {
    handleGetConversation({ body: params });
  }, [handleGetConversation, params]);

  useEffect(() => {
    if (mobileMode) return;
    if (conversations?.length > 0) {
      console.log(conversations[0], 'conversations[0]');
      onSelectRoom(conversations[0]);
    }
  }, [conversations, onSelectRoom]);  

  const onChangeParamsConversation = (params: ParamState) => {
    setParams(params)
  }

  return {
    onSearchText: (text) => setParams({ ...params, text: text as string }),
    onChangeParamsConversation,
  };
};

export default useFetchingChatting;

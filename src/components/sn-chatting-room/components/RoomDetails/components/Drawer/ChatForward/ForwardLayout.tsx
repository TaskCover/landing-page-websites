import Box from "@mui/material/Box";
import { useChat } from "store/chat/selectors";
import ForwardHeader from "./ForwarHeader";
import ChatForward from "components/sn-chat/ChatForward";
import { useState } from "react";

const ForwardLayout = () => {
  const { onSetDrawerType } = useChat();
  const [param, setParam] = useState({
    text: '',
  })
  const [conversations, setConversation] = useState([]);
  // handle get all conversation
  // const response = await client.post("getAllConversations", paramReq, {
  //   baseURL: CHAT_API_URL,
  // }); 
  //setConversation(response.data.data);

  // const [textSearch, setTextSearch] = useState("");

  const onSearchTxt = (value) => {
    console.log(value);
    
  }

  // useEffect(() => {
  // handle get all conversation

  // }, [ param]);



  return (
    <>
      <ForwardHeader onSearchTxt={onSearchTxt} onPrevious={() => onSetDrawerType('info')}  />
      <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        height="calc(600px - 77px)"
      >
        <ChatForward conversations={conversations} callbackCancel={() => onSetDrawerType("info")} />
      </Box>
    </>
  );
};

export default ForwardLayout;

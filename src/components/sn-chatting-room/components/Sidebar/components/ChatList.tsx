import NoData from "components/NoData";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React from "react";
import ChatSingle from "./ChatSingle";
import { Box } from "@mui/material";

const ChatList = () => {
    const { conversations } = useChattingActions();
    return (
        conversations.length > 0 ?
            (
                <Box display="flex" flexDirection="column" width="100%" height="90vh" sx={{ overflowX: 'scroll' }}>
                    {conversations.map(conversation => (
                        <ChatSingle
                            key={conversation._id}
                            {...conversation}
                        />
                    ))}
                </Box>
            )
            :
            <NoData />
    )
};

export default ChatList; 

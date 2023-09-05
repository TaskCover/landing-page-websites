"use client";

import NoData from "components/NoData";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React from "react";
import ChatSingle from "./ChatSingle";

const ChatList = () => {
    const { conversations } = useChattingActions();
    return (
        conversations.length > 0 ? conversations.map(conversation => {
            const { key, ...propsConversation } = conversation;
            return (
                <ChatSingle
                    key={key}
                    isOnline
                    {...propsConversation}
                />
            )
        }) : <NoData />
    )
};

export default ChatList; 

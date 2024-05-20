import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isFirstMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { Tooltip, Avatar } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div style={{ display: "flex" }} key={m._id}>
                    {
                        (isSameSender(messages, m, i, user._id) || 
                        isFirstMessage(messages, i, user._id)) && (
                            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                            <Avatar
                                mt='7px'
                                mr={1}
                                size='sm'
                                cursor='pointer'
                                name={m.sender.name}
                                src={m.sender.pic}
                            />
                            </Tooltip>
                        )
                    }
                    <span 
                        style=
                        {{ 
                            backgroundColor: `${m.sender._id === user._id ? "#3E6089" : "#005C4B"}`,
                            color:"white",
                            borderRadius: "18px",
                            padding: "8px 20px 8px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            marginTop: isSameUser(messages, m, i, user._id) ? 4 : 10,
                        }}
                    >
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;
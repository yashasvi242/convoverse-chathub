import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Box, Stack, Text } from '@chakra-ui/layout'
import { Button } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import ChatSkeleton from './ChatSkeleton.js';
import GroupChatModal from '../components/miscellaneous/GroupChatModal.js'
import { getSender } from "../config/ChatLogics.js";
import { Avatar } from "@chakra-ui/react"; 

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats} = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try 
    {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } 
    catch (error) 
    {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? 'none': "flex", md: "flex" }}
      flexDir="column"
      alignItems='center'
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      backgroundColor="#282828" 
      color="#AEBAC1"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Poppins"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
      >
       My Chats 
        <GroupChatModal>
          <Button
            display="flex"
            backgroundColor="#434343" color="#AEBAC1"
            fontSize={{ base: "13px", md: "10px", lg: "13px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        backgroundColor="#313131" 
        color="#AEBAC1"
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#39B9AF" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "#B8C6C9"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                backgroundColor="#494949" 
                display="flex"
                alignItems="center"
              >
                <Avatar
                  mr={2}
                  size='sm'
                  cursor="pointer"
                  src={chat.user && chat.user.pic}
                />
                <Text>
                  {!chat.isGroupChat 
                    ? getSender(loggedUser,chat.users) 
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatSkeleton />
        )}
      </Box>
    </Box>
  )
}

export default MyChats;
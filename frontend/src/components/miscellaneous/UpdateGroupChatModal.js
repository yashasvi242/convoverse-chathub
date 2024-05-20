import React, { useState } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider.js';
import UserBadgeItem from '../UserAvatar/UserBadgeItem.js';
import UserListItem from '../UserAvatar/UserListItem.js'
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleRename = async () => {
        if(!groupChatName) return

        try 
        {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {newName} = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config)

            setSelectedChat(newName);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } 
        catch (error) 
        {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenameLoading(false);
        }
        setGroupChatName(" ");
        onClose();
    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return;

        try 
        {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            // console.log(data);
            setLoading(false);
            setSearchResult(data);
        }
        catch(error)
        {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false);
        }
    };

    const handleAddUser = async (user1) => {
        if(selectedChat.users.find((u) => u._id === user1._id))
        {
            toast({
                title: "User Already in the Group!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if(selectedChat.groupAdmin._id !== user._id)
        {
            toast({
                title: "Only Admins can add someone!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }

        try 
        {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { newAddedUser } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: user1._id
            }, config);

            setSelectedChat(newAddedUser);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        }
        catch (error) 
        {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    }

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) 
        {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try 
        {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`/api/chat/groupremove`,{
                chatId: selectedChat._id,
                userId: user1._id,
            }, config);

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        }
        catch (error) 
        {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };

    return (
    <>
      <IconButton display={{ base: 'flex' }} backgroundColor="#444444" icon={<EditIcon color="#AEBAC1"/>} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent backgroundColor="#393939" color="#AEBAC1">
          <ModalHeader
            fontSize='35px'
            fontFamily='Poppins'
            display='flex'
            justifyContent='center'
          >
            {selectedChat.chatName.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap='wrap' pb={3} >
                {selectedChat.users.map((u)=> (
                    <UserBadgeItem
                        key={user._id}
                        user={u}
                        handleFunction={() => handleRemove(u)}
                    />
                ))}
            </Box>
            <FormControl display='flex'>
                <Input 
                    placeholder='New Chat Name'
                    mb={3}
                    value={groupChatName}
                    border='1px solid #5A6066'
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                    variant="outline"
                    color="#2CBB5D"
                    border="1px solid #2CBB5D"
                    backgroundColor='#283A2E'
                    ml={2}
                    isLoading={renameLoading}
                    onClick={handleRename}
                    loadingText='Updating'
                >
                    Update
                </Button>
            </FormControl>
            <FormControl>
                <Input 
                    placeholder='Add user to group'
                    mb={1}
                    border='1px solid #5A6066'
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </FormControl>
            {loading
                ? <Spinner size='sm'></Spinner>
                : (
                    searchResult?.map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => handleAddUser(user)}
                        />
                    ))
                )
            }
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme='red'>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal;
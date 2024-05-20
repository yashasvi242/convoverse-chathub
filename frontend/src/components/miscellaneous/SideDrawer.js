import React, { useState } from 'react';
import { Box,Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Input } from '@chakra-ui/input'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu"
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useToast
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar';
import { Button } from "@chakra-ui/button";
import { BellIcon,ChevronDownIcon } from "@chakra-ui/icons"
import { ChatState } from "../../Context/ChatProvider"
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks"
import axios from 'axios';
import ChatSkeleton from '../ChatSkeleton.js';
import UserListItem from '../UserAvatar/UserListItem.js';
import { Spinner } from "@chakra-ui/spinner"
import { getSender } from '../../config/ChatLogics.js';
import NotificationBadge, { Effect } from 'react-notification-badge';

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false);

  const { user,setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  const handleSearch= async() => {
    if(!search)
    {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try 
    {
      setLoading(true)
      
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config)

      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } 
    catch (error) 
    {
      toast({
        title: "Error Occured",
        description: "Failed to Load Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try
    {
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.post('/api/chat', { userId }, config);

      if(!chats.find((c) => c._id === data._id))
      {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    }
    
    catch(error)
    {
      toast({
        title: "Error fetching the Chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent='space-between'
        alignItems="center"
        bg="#202C33"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="black"
      >
        <Tooltip  
          label="Search Users to Chat" 
          hasArrow
          placement="bottom-end"
        >
          <Button variant="ghost" backgroundColor="#393939" onClick={onOpen}>
            <i class="fas fa-search" style={{color:"#AEBAC1"}}></i>
            <Text d={{base:"none", md:'flex'}} px="4" color="#AEBAC1">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="3xl" fontFamily="Poppins" fontWeight="500" color="white">
            Chat<span style={{fontWeight:"bolder", color:"#1BBFA6"}}>HUB</span>
          </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge 
                count={notification.length}
                effect={Effect.SCALE}  
              />
              <BellIcon fontSize='2xl' m={1} color="#AEBAC1" />
            </MenuButton>
            <MenuList pl={2} pb={2} backgroundColor="#393939" color="#AEBAC1" border="1px solid black">
              {!notification.length && "No New Messages"} 
              {notification.map((notif) => (
                <MenuItem backgroundColor="#393939" color="#AEBAC1" key={notif._id} onClick={() => {
                  setSelectedChat(notif.chat)
                  setNotification(notification.filter((n) => n !== notif))
                }}>
                  {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} backgroundColor="#393939" color="#AEBAC1">
              <Avatar 
                size='sm' 
                cursor='pointer' 
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList backgroundColor="#393939" color="#AEBAC1" border="2px solid black">
              <ProfileModal user={user}>
                <MenuItem backgroundColor="#393939" color="#AEBAC1">My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandler} backgroundColor="#393939" color="#AEBAC1">Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader backgroundColor="#393939" color="#AEBAC1">Search Users</DrawerHeader>
          <DrawerBody backgroundColor="#393939" color="#AEBAC1"> 
            <Box display='flex' paddingBottom={2} >
              <Input
                placeholder='Search by name or email'
                mr={2}
                ml={-1}
                _hover={{borderColor: "#2CBB5D"}}
                _focus={{borderColor: "#2CBB5D"}}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} backgroundColor="#2CBB5D" color="white">Go</Button>
            </Box>
            {loading 
              ? <ChatSkeleton /> 
              : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )
            }
            {loadingChat && <Spinner ml='auto' display='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer;
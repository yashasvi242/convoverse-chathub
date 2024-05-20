import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center
} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) history.push('/chats');
  }, [history]);
  return (
     <Container maxW="xl" centerContent alignItems='center' >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        backgroundColor="#393939" 
        color="#AEBAC1"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
      >
        <Center>
          <Text fontSize="3xl" fontFamily="Poppins" fontWeight="500" color="white">
            Chat<span style={{fontWeight:"bolder", color:"#1BBFA6"}}>HUB</span>
          </Text>
        </Center>
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' backgroundColor="#393939" color="#AEBAC1">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb='1em'>
            <Tab color="2CBB5D" width="50%">Login</Tab>
            <Tab color="2CBB5D" width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage;
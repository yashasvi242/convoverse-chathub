import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider.js"

const Login = () => {
   // Hooks
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const { setUser } = ChatState();
   
    // Functions
    const handleClick = () => setShow(!show);
    
    const submitHandler = async () => {
        setLoading(true);
        if(!email || !password)
        {
            toast({
                title: 'Please Fill all the Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
        console.log(email, password);
        try
        {
            const config = {
                header:{
                    "Content-type":"application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email,password },
                config
            );
            // console.log(JSON.stringify(data));
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setUser(data);
            localStorage.setItem("userInfo",JSON.stringify(data));

            setLoading(false);
            history.push("/chats");
        }
        catch(error)
        {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

  return (
    <VStack spacing='5px' >
        <FormControl id='email' isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input 
                value={email}
                type='email'
                placeholder="Enter Your Name"
                borderColor="#5A6066"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    value={password}
                    borderColor="#5A6066"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        
        <Button
            backgroundColor='#1BBFA0'
            color='white'
            _hover={{ backgroundColor:'#0F8C7D' }}
            background="#0F8C7D"
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
        >
          Login
        </Button>
    </VStack>
  )
}

export default Login
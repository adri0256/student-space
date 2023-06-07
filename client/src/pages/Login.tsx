import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

import { useLoginMutation } from '../features/auth/authApiSlice';

import {
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Button,
    Divider,
    Center,
    Box,
    useToast,
} from '@chakra-ui/react'

const PasswordInput = (props: any) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size="md">
        <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            {...props}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }

export const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const toast = useToast()

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    useEffect(() => {
        errMsg && toast({
            title: "Error",
            description: errMsg,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });

        return () => {
            setErrMsg('');
        }
    }, [errMsg]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('login', user, pwd);

        try {
            const userData = await login({ user, pwd }).unwrap();
            console.log(userData);

            toast({
                title: "Success",
                description: "Login successful",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });

            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            navigate('/home');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if(!err?.status || !err?.originalStatus) {
                setErrMsg('No response from server');
            } else if (err.status === 400) {
                setErrMsg(err.data.message);
            } else if (err.originalStatus === 401) {
                setErrMsg('Invalid credentials');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current?.focus();
        }
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

    const content = (
        <Center h="500px">
            <form onSubmit={handleSubmit}>
                <VStack spacing="4">
                    <InputGroup>
                        <Input
                        onChange={handleUserChange}
                        name="username"
                        type="text"
                        ref={userRef}
                        value={user}
                        placeholder="Username"
                        />
                    </InputGroup>
                    <InputGroup>
                        <PasswordInput onChange={handlePasswordChange} name="password" value={pwd} />
                    </InputGroup>
                    <Button
                        onClick={handleSubmit}
                        colorScheme="green"
                        isLoading={isLoading}
                    >
                        Login
                    </Button>
                </VStack>
            </form>
        </Center>
    )

    return content;
}

export default Login

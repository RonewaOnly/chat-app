import { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import { io } from 'socket.io-client';


const ChatBox = () => {
    const socketRef = useRef(null)

    const [message, setMessage] = useState([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState(null);


    useEffect(() => {
          socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

        //generating userID
        let storedUserId = sessionStorage.getItem("userId");
        if (!storedUserId) {
            storedUserId = Math.random().toString(36).substring(7);
            sessionStorage.setItem('userId', storedUserId);

        }
        setUserId(storedUserId);

        //listern for message
        socketRef.current.on('receiveMessage', (message) => {
            setMessage((prevMessage) => [...prevMessage, message]);
            console.log('Message received:', message);
        });

        return () => {
            socketRef.current.off('receiveMessage');
        }
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                userId,
                text: input,
            };

            socketRef.current.emit('sendMessage', message);
            console.log('Message sent:', socketRef);
            setInput('');
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Box h="400px" p={4} borderWidth={1} borderRadius="lg"
                overflowY="auto">
                {message.map((msg, index) => (
                    <HStack key={index} justify={msg.userId === userId ? 'flex-end' : 'flex-start'}>
                        {msg.userId === userId && <Avatar name='me' />}

                        <Box bg={msg.userId === userId ? "blue.100" : "green.100"} p={3} borderRadius="lg"
                            maxW="70%">
                            <Text>{msg.text}</Text>
                        </Box>
                        {msg.userId !== userId && <Avatar name='other' />}
                    </HStack>
                ))}
            </Box>

            <HStack>
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type message' />
                <Button onClick={sendMessage} colorScheme='teal'>Send</Button>
            </HStack>
        </VStack>
    );

};

export default ChatBox
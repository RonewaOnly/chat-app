import {ChakraProvider, Box , Heading} from '@chakra-ui/react'
import ChatBox from './components/ChatBox'
import './App.css'

function App() {

  return (
    <ChakraProvider>
      <Box p={5} bg="white" w="100%" h="100vh">
        <Heading as="h1" size="lg" mb={4}>Chat App</Heading>
        <ChatBox/>
      </Box>
    </ChakraProvider>
  )
}

export default App

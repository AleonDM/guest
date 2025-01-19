import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

const socket = socketIO(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['polling', 'websocket']
})

socket.on('connect_error', (error) => {
  console.error('Connection error:', error)
})

socket.on('connect', () => {
  console.log('Connected to server')
})

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home socket={socket}/>} />
      <Route path='/chat' element={<ChatPage socket={socket}/>} />
    </Routes>
  )
}

export default App

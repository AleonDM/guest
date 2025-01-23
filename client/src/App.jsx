import { Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

const socket = io('https://guest-xi.vercel.app/', {
  transports: ['polling', 'websocket'],
  path: '/socket.io/',
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('connect_error', () => {
  console.log('Failed to connect to server')
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

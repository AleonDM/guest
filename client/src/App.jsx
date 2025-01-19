import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

const socket = socketIO.connect(import.meta.env.VITE_API_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true
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

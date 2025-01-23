import React, { useState } from 'react';
import styles from './styles.module.css';
import { IoSend } from 'react-icons/io5';

const MessageBlock = ({socket}) => {
    const [message, setMessage] = useState('')

    const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} печатает...`)

    const handleSend = (e) => {
        e.preventDefault()
        if(message.trim()) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('user'),
                id: `${socket.id}-${Math.random()}`,
                socketID: socket.id
            })
        }
        setMessage('')
    }

    return (
        <div className={styles.messageBlock}>
            <form className={styles.form} onSubmit={handleSend}>
                <input 
                    type="text"
                    className={styles.userMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={isTyping}
                    placeholder="Введите сообщение..."
                />
                <button className={styles.sendButton} type="submit">
                    <IoSend size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageBlock;
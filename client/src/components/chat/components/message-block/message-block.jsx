import React, { useState } from 'react';
import styles from './styles.module.css';

const MessageBlock = ({socket}) => {
    const [message, setMessage] = useState()

    const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} печатает...`)

    const handleSend = e => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem('user')) {
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
                />
                <button className={styles.btn}>Отправить</button>
            </form>
        </div>
    );
};

export default MessageBlock;
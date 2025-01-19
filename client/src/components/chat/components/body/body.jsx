import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Body = ({messages, status}) => {
    const navigate = useNavigate()
    const handleLeave = () => {
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn} onClick={handleLeave}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                {
                    messages.map(element => 
                        element.name === localStorage.getItem('user') ? (
                            <div className={styles.chats} key={element.id}>
                                <p className={styles.senderName}>Вы</p>
                                <div className={styles.messageSender}>
                                    <p>{element.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.chats} key={element.id}>
                                <p>{element.name}</p>
                                <div className={styles.messageRecipient}>
                                    <p>{element.text}</p>
                                </div>
                            </div>
                        ))
                }

                <div className={styles.status}>
                    <p>{status}</p>
                </div>

            </div>
        </>
    );
};

export default Body;
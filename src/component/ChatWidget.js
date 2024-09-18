import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import { Send } from 'tabler-icons-react';
import io from 'socket.io-client';
const socket = io('http://localhost:8080'); // Connect to your server

const ChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chat message', (msg) => {
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
    
        // Clean up on unmount
        return () => {
          socket.off('chat message');
        };
      }, []);

    const handleSend = () => {
        if (input) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            socket.emit('chat message', input);
            inputRef.current.focus();
            setInput('');
        }
    };

    return (
        <div className="chat-widget">
            <h3>Chat</h3>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender}>
                        <strong>{message.sender}: </strong>{message.text}
                    </div>
                ))}
            </div>
            <div className='flex border-2 border-grey-400'>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {/* <button onClick={handleSend}>Send</button> */}
                <div className='bg-white'>
                <Send
                    size={30}
                    color='green'
                    onClick={handleSend}
                />
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;

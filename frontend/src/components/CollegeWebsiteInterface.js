import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import './CollegeWebsiteInterface.css';

const CollegeWebsiteInterface = () => {
    const [showChat, setShowChat] = useState(false);////
    const [activePage, setActivePage] = useState('dashboard');
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        // Add the user message to the chat
        setMessages([...messages, { text: inputMessage, sender: 'user' }]);
        const userQuery = inputMessage;
        setInputMessage('');

        // Send the user query to the backend
        try {
            const response = await axios.post(
                'https://fb1f-2405-201-c038-2826-7dba-65e2-f42f-c9b6.ngrok-free.app/rag', // Replace with your ngrok public URL
                { query: userQuery }
            );

            const botResponse = response.data.response;

            // Update the chat with the bot's response
            setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error("Error communicating with the backend:", error);
            setMessages((prev) => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: 'bot' }]);
        }
    };

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return (
                    <div className="container">
                        <h2 className="display-5 mb-4">Dashboard</h2>
                        <div className="card mb-4 p-3">
                            <h3 className="h5">Welcome To Keshav Memorial Institute of Technology</h3>
                            <p>KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY (KMIT), established in 2007...</p>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="container">
                        <h2 className="display-6 mb-4">About KMIT</h2>
                        <p>Keshav Memorial Institute of Technology (KMIT) is a premier engineering college...</p>
                    </div>
                );
            case 'events':
                return (
                    <div className="container">
                        <h2 className="display-6 mb-4">Upcoming Events</h2>
                        <div className="card mb-3 p-3">
                            <h3 className="h5">Synergy 2024</h3>
                            <p>Date: March 15-17, 2024...</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="app">
            <header className="bg-primary text-white p-3">
                <div className="container d-flex justify-content-between">
                    <h1 className="display-6">Keshav Memorial Institute of Technology</h1>
                    <nav>
                        <ul className="nav">
                            {['dashboard', 'about', 'events'].map((page) => (
                                <li key={page} className="nav-item">
                                    <button
                                        onClick={() => setActivePage(page)}
                                        className={`nav-link ${activePage === page ? 'active' : ''}`}
                                    >
                                        {page.charAt(0).toUpperCase() + page.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container my-4">
                {renderContent()}
            </main>

            <div className="fixed-bottom me-4 mb-4 text-end">
                <button
                    onClick={() => setShowChat(!showChat)}
                    className="btn btn-primary rounded-circle"
                >
                    <MessageCircle size={24} />
                </button>
            </div>

            {showChat && (
                <div className="chat-container">
                    <div className="chat-header p-3 border-bottom">
                        <h1 className="h5">KMIT Chatbot</h1>
                    </div>
                    <div className="chat-messages p-3 overflow-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-end' : ''}`}>
                                <div className={`chat-bubble ${message.sender}`}>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-top">
                        <div className="input-group">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="form-control"
                                placeholder="Type your message..."
                            />
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CollegeWebsiteInterface;

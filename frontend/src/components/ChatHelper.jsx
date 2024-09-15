import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Add loading icon

function ChatHelper() {
    const location = useLocation();
    const recipe = location.state?.recipe;
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const chatRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsChatOpen(false);
            }
        };
        if (isChatOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isChatOpen]);

    const sendMessage = async () => {
        if (!input) return;

        setIsLoading(true); // Start loading

        const userMessage = { message: input, recipeContext: recipe };
        const response = await fetch("http://localhost:4000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userMessage),
        });
        const data = await response.json();

        setMessages([
            ...messages,
            { sender: "user", text: input },
            { sender: "bot", text: formatMessage(data.response) },
        ]);
        setInput("");
        setIsLoading(false); // Stop loading
    };

    const formatMessage = (text) => {
        return text
            .replace(/\*/g, "")
            .replace(/(\d+\.)/g, "\n$1")
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line, index) => {
                if (line.trim().startsWith("-")) {
                    return (
                        <p key={index} className="ml-4 mb-2">
                            • {line.trim().substring(1).trim()}
                        </p>
                    );
                } else {
                    return (
                        <p key={index} className="mb-4">
                            {line.trim()}
                        </p>
                    );
                }
            });
    };

    return (
        <>
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            >
                <AiOutlineMessage size={30} />
            </button>

            {isChatOpen && (
                <div
                    ref={chatRef}
                    className="fixed bottom-0 right-0 w-3/4 md:w-2/5 p-4 bg-white shadow-md rounded-lg"
                >
                    <div className="messages overflow-y-auto h-60">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <p
                                    className={`p-2 m-2 rounded-md ${
                                        msg.sender === "user"
                                            ? "bg-blue-500 text-white w-3/4 text-left"
                                            : "bg-gray-300 text-black w-3/4 text-left"
                                    }`}
                                >
                                    {msg.text}
                                </p>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-center">
                                <AiOutlineLoading3Quarters className="animate-spin text-blue-500" size={24} />
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-2 border rounded-md mt-2"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full"
                        disabled={isLoading} 
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            )}
        </>
    );
}

export default ChatHelper;

"use client";
import { Bot, RefreshCcw, Send, User } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        sender: "bot",
        text: input,
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const resetMessages = () => {
    setMessages([]);
  };

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="bg-gray-100 h-full w-full flex flex-col max-w-lg mx-auto">
        <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
          <button className="hover:bg-teal-400 rounded-md p-1">
            <User />
          </button>
          <span>MyBot.Chat</span>
          <div className="relative inline-block text-left">
            <button 
              id="reset" 
              onClick={resetMessages}
              className="hover:bg-teal-400 rounded-md p-1">
              <RefreshCcw />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-2">
            {messages.map((msg) => {
              if (msg.sender === "bot") {
                return (
                  <div key={msg.id} className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full border shadow-md p-2">
                        <Bot color="#000000"/>
                      </div>
                    </div>
                    <div className="chat-bubble bg-gray-300 break-words">
                      <p className="text-gray-900">{msg.text}</p>
                      </div>
                  </div>
                );
              } else {
                return (
                  <div key={msg.id} className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full p-2 bg-slate-500">
                        <User color="#fff"/>
                      </div>
                    </div>
                    <div className="chat-bubble bg-gray-300 break-words">
                      <p className="text-gray-900">{msg.text}</p>
                      </div>
                  </div>
                );
              }
            })}
            {loading && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full border shadow-md p-2">
                        <Bot color="#000000"/>
                    </div>
                </div>
                <div className="chat-bubble bg-gray-300 break-words">
                  <div className="flex items-center gap-1">
                    <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-3 w-3 bg-white rounded-full animate-bounce'></div>
                  </div>
                 
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={OnChange}
            onKeyDown={handleKeyDown}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            className="bg-teal-600 text-white rounded-full p-2 ml-2 hover:bg-teal-500 focus:outline-none"
            onClick={handleSend}
          >
            <Send />
          </button>
        </div>
      </div>
    </>
  );
}

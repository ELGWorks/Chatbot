import { useState, useEffect } from "react";
import { ChatInput } from "./components/ChatInput";
import { Chatbot } from "supersimpledev";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  //5h custom responses
  useEffect(() => {
    Chatbot.addResponses({
      Hi: "Hey there! How can I help you today?",
      hi: "Howdy! Is there anything I can help you with, today?",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;

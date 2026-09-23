import dayjs from "dayjs";
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
import loadingSpinner from "../assets/loading-spinner.gif";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clearMessage() {
    localStorage.removeItem("messages");
    setChatMessages([]);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages(newChatMessages);

    setInputText("");

    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        message: <img src={loadingSpinner} className="loading-gif" />,
        sender: "bot",
        time: dayjs().valueOf(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "bot",
        time: dayjs().valueOf(),
      },
    ]);

    setIsLoading(false);
  }

  function keyDownHandler(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={keyDownHandler}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessage} className="clear-button">
        Clear
      </button>
    </div>
  );
}

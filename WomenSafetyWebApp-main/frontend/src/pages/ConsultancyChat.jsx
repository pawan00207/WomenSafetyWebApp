import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/ConsultancyChat.css"; // We will create and add styles to this file

const ConsultancyChat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/consultancy/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChats(response.data.reverse()); // Show latest message at the bottom
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Optimistically update UI
      const newChat = { message, response: "Thinking..." };
      setChats([...chats, newChat]);
      setMessage("");

      const response = await axios.post(
        "http://localhost:8000/api/v1/consultancy",
        { userId, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Replace optimistic update with actual response
      setChats([...chats, response.data]);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      // Revert optimistic update on failure
      setChats(chats.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex consultancy-chat-page">
      <Sidebar />
      <div className="chat-container container-fluid">
        <div className="chat-header">
          <h3>Her Guardian Support</h3>
          <p>Your 24/7 lifeline for help and advice</p>
        </div>
        <div className="chat-body">
          {chats.length === 0 ? (
            <div className="no-messages-container">
              <div className="no-messages-placeholder">
                <span>Your conversation will appear here.</span>
              </div>
            </div>
          ) : (
            chats.map((chat, index) => (
              <div key={index}>
                <div className="message-container user-message">
                  <div className="message-bubble">{chat.message}</div>
                </div>
                <div className="message-container consultant-message">
                  <div className="message-bubble">{chat.response}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="chat-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="btn btn-send"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? <div className="spinner-border spinner-border-sm" role="status"></div> : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyChat;

import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/consultancy",
        { userId, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChats([response.data, ...chats]);
      setMessage("");
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h2 className="mb-4">24/7 Consultancy Chat</h2>
        <div className="card">
          <div className="card-body" style={{ height: "500px", overflowY: "auto" }}>
            {chats.length === 0 ? (
              <p className="text-center text-muted">No messages yet. Start a conversation!</p>
            ) : (
              chats.map((chat, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-end mb-2">
                    <div className="bg-primary text-white p-2 rounded">
                      <strong>You:</strong> {chat.message}
                    </div>
                  </div>
                  <div className="d-flex justify-content-start">
                    <div className="bg-light p-2 rounded">
                      <strong>Consultant:</strong> {chat.response}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyChat;

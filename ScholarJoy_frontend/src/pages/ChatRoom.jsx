import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, PlusCircle, MessageCircle, User, Hash } from 'lucide-react';

function ChatRoom() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [username, setUsername] = useState(`user${Math.floor(Math.random() * 1000)}`);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:9000/rooms');
        setRooms(response.data);
        if (response.data.length > 0) {
          selectRoom(response.data[0].name);
        } else {
          setIsCreateRoomModalOpen(true);
        }
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!currentRoom) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/rooms/${currentRoom}/messages`);
        setMessages(response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [currentRoom]);

  const selectRoom = (room) => setCurrentRoom(room);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentRoom) return alert('Please select or create a room first');
    if (message.trim() && username) {
      try {
        await axios.post(`http://localhost:9000/rooms/${currentRoom}/messages`, {
          sender: username,
          message: message.trim(),
        });
        setMessage('');
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 mt-16">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <MessageCircle className="mr-2 text-green-500" /> Rooms
          </h2>
          <button onClick={() => setIsCreateRoomModalOpen(true)} className="text-green-500 flex items-center">
            <PlusCircle className="mr-1" /> Add Room
          </button>
        </div>
        <div className="overflow-y-auto space-y-2">
          {rooms.map((room) => (
            <button
              key={room.name}
              onClick={() => selectRoom(room.name)}
              className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 ${
                currentRoom === room.name ? 'bg-green-50 border-l-4 border-green-500 text-green-700' : 'text-gray-600'
              }`}
            >
              <Hash className="mr-2 text-gray-400" /> {room.name}
            </button>
          ))}
        </div>
        <div className="mt-4 border-t pt-3 flex items-center">
          <User className="mr-2 text-gray-500" />
          <span className="text-gray-700">{username}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col px-4">
        <div className="p-4 bg-white border-b mb-2">
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <Hash className="mr-2 text-green-500" /> {currentRoom || 'No Room Selected'}
          </h1>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-sm"
          style={{ maxHeight: "65vh" }}
        >
          {!currentRoom && <div className="text-center text-gray-500">Select a room to start chatting</div>}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${
                msg.sender === username ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                <div className="font-semibold text-sm mb-1">{msg.sender === username ? 'You' : msg.sender}</div>
                <div>{msg.message}</div>
                <div className="text-xs mt-1 text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t mt-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentRoom ? "Type a message..." : "Select a room first"}
              disabled={!currentRoom}
              className="flex-grow p-2 border rounded-lg disabled:opacity-50"
            />
            <button type="submit" disabled={!currentRoom} className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Create Room Modal */}
      {isCreateRoomModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Create New Room</h2>
            <input
              type="text"
              placeholder="Enter room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreateRoomModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!newRoomName.trim()) return;
                  try {
                    await axios.post('http://localhost:9000/rooms', {
                      name: newRoomName.trim(),
                    });
                    const res = await axios.get('http://localhost:9000/rooms');
                    setRooms(res.data);
                    setCurrentRoom(newRoomName.trim());
                    setNewRoomName('');
                    setIsCreateRoomModalOpen(false);
                  } catch (error) {
                    console.error("Failed to create room", error);
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;

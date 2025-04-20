import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, Send, Loader2 } from 'lucide-react';

const PDFChatInterface = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      try {
        setIsLoading(true);
        const response = await axios.post('http://127.0.0.1:9000/upload-pdf', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        setFile(uploadedFile);
        setMessages([{ 
          type: 'system', 
          content: `PDF "${uploadedFile.name}" uploaded successfully. You can now ask questions about its content.` 
        }]);
      } catch (error) {
        console.error('File upload error:', error);
        setMessages(prev => [...prev, { 
          type: 'system', 
          content: 'Error uploading PDF. Please try again.' 
        }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleSendMessage = async () => {
    if (!userQuery.trim() || !file) return;

    const newMessages = [
      ...messages, 
      { type: 'user', content: userQuery }
    ];
    setMessages(newMessages);
    setUserQuery('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:9000/chat-pdf', {
        query: userQuery
      });

      setMessages(prev => [
        ...prev, 
        { type: 'ai', content: response.data.answer, 
          context: response.data.context || [] 
        }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'system', 
        content: 'Error processing your question. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">PDF Chat</h2>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf"
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current.click()}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Upload className="mr-2" /> Upload PDF
        </button>
      </div>

      <div className="h-[500px] border border-gray-200 rounded-lg overflow-y-auto mb-4 p-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-4 p-3 rounded-lg max-w-[80%] 
              ${msg.type === 'user' ? 'bg-blue-100 ml-auto' : 
                msg.type === 'ai' ? 'bg-green-100' : 'bg-gray-100'}
            `}
          >
            {msg.type === 'ai' && msg.context && msg.context.length > 0 && (
              <div className="text-xs text-gray-600 mb-2">
                <strong>Context References:</strong>
                {msg.context.map((ctx, i) => (
                  <div key={i} className="ml-2">
                    Page {ctx.page}: {ctx.text.slice(0, 100)}...
                  </div>
                ))}
              </div>
            )}
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-blue-600" />
          </div>
        )}
      </div>

      <div className="flex">
        <input 
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask a question about the PDF"
          disabled={!file}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50"
        />
        <button 
          onClick={handleSendMessage}
          disabled={!file || isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg 
            hover:bg-blue-700 disabled:opacity-50"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default PDFChatInterface;
import React, { useState, useCallback } from 'react';
import Typical from 'react-typical';
import styles from '../components/FileUpload.module.css';

function ChatInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter information about your school..."
          className="w-full p-4 pr-24 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function FileUploadButton({ isVisible, onClose }) {
  const [fileName, setFileName] = useState('NO SELECTED FILE');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name.toUpperCase());
      console.log('File uploaded:', file.name);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={styles.container}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <label htmlFor="file" className={styles.header}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Click to upload a syllabus</p>
        </label>
        <div className={styles.footer}>
          <p>Selected file: <span className={styles.fileName}>{fileName}</span></p>
        </div>
        <input 
          id="file" 
          type="file" 
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}

export default function MainPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChatSubmit = (message) => {
    setMessages([...messages, { text: message, type: 'user' }]);
    // Add your chat processing logic here
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center">
      <div className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold mb-4">
          Welcome to{' '}
          <span className="text-blue-400">
            <Typical
              steps={['Studdy', 2000]}
              loop={Infinity}
              wrapper="span"
            />
          </span>
        </h1>
        <p className="text-xl text-blue-400 mb-8">
          You are now signed in or continuing as guest.
        </p>
      </div>
      
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg bg-gray-800">
              {msg.text}
            </div>
          ))}
        </div>
        <ChatInput onSubmit={handleChatSubmit} />
        <button
          onClick={() => setShowUpload(true)}
          className="mt-4 w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors"
        >
          + Add syllabus file
        </button>
      </div>

      <FileUploadButton 
        isVisible={showUpload} 
        onClose={() => setShowUpload(false)} 
      />
    </div>
  );
}
// This code is a React component that serves as the main page of a web application.
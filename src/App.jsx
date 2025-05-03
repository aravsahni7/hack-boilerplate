import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button';
import HomePage from './components/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="absolute inset-0 w-screen h-screen bg-black text-white flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
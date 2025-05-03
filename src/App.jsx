import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button';
import HomePage from './components/HomePage'

export default function App() {
  return (
    <div className="absolute inset-0 w-screen h-screen bg-black text-white flex flex-col">
      <HomePage />
    </div>
  )
}
import React from 'react'

export default function MainPage() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold mb-4">
        Welcome to Main Page
      </h1>
      <p className="text-xl text-blue-400">
        You are now signed in or continuing as guest.
      </p>
    </div>
  )
}


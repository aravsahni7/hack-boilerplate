import React, { useState } from 'react'
import Button from './Button'
import viteLogo from '/vite.svg'
import MainPage from './MainPage'
import logo from '/Users/ansh/Downloads/ChatGPT Image May 3, 2025, 12_52_14 AM Background Removed.png'

// Registration modal component
// Registration modal component
function RegisterModal({ onClose, onSignIn, onSubmit }) {
    const [firstname, setFirstname] = useState('')
    const [lastname,  setLastname]  = useState('')
    const [email,     setEmail]     = useState('')
    const [password,  setPassword]  = useState('')
    const [confirm,   setConfirm]   = useState('')
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="relative bg-gray-900 text-white p-6 rounded-2xl border border-gray-700 max-w-md w-full">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Register</h2>
          <p className="text-sm text-gray-400 mb-4">
            Signup now and get full access to our app.
          </p>
  
          <input
            type="text"
            placeholder="Firstname"
            required
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            className="w-full mb-2 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <input
            type="text"
            placeholder="Lastname"
            required
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            className="w-full mb-2 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-2 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-2 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <input
            type="password"
            placeholder="Confirm password"
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full mb-4 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded mb-2"
            onClick={() =>
              onSubmit({ firstname, lastname, email, password, confirm })
            }
          >
            Submit
          </button>
  
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <button
              onClick={onSignIn}
              className="text-blue-400 hover:underline focus:outline-none"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    )
  }
  

// Sign-in modal component
// Sign-in modal component
function SignInModal({ onClose, onRegister, onSubmit }) {
    const [email,    setEmail]    = useState('')
    const [password, setPassword] = useState('')
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="relative bg-gray-900 text-white p-6 rounded-2xl border border-gray-700 max-w-md w-full">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Sign In</h2>
          <p className="text-sm text-gray-400 mb-4">
            Welcome back! Please sign in to your account.
          </p>
  
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-4 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-6 bg-gray-800 text-white px-2 py-2 rounded focus:outline-none focus:border-blue-400"
          />
  
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded mb-2"
            onClick={() => onSubmit({ email, password })}
          >
            Submit
          </button>
  
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <button
              onClick={onRegister}
              className="text-blue-400 hover:underline focus:outline-none"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    )
  }
  

// Guest modal component
function GuestModal({ onClose, onContinue }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-gray-900 text-white p-6 rounded-2xl border border-gray-700 max-w-sm w-full text-center">
        <p className="text-xl font-semibold mb-4">Continue as guest?</p>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
            onClick={onContinue}
          >
            Continue
          </button>
          <button
            className="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
    const [showRegister, setShowRegister] = useState(false)
    const [showSignIn,   setShowSignIn]   = useState(false)
    const [showGuest,    setShowGuest]    = useState(false)
    const [loggedIn,     setLoggedIn]     = useState(false)
  
    const openRegister = () => { setShowRegister(true); setShowSignIn(false); setShowGuest(false) }
    const openSignIn   = () => { setShowSignIn(true);   setShowRegister(false); setShowGuest(false) }
    const openGuest    = () => { setShowGuest(true);     setShowRegister(false); setShowSignIn(false) }
    const closeAll     = () => { setShowRegister(false); setShowSignIn(false); setShowGuest(false) }
  
    // Signup handler: calls backend /signup
    const handleRegisterSubmit = async (data) => {
      try {
        const res = await fetch('http://localhost:5001/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname:        data.firstname,
            lastname:         data.lastname,
            email:            data.email,
            password:         data.password,
            confirm_password: data.confirm
          })
        })
        const body = await res.json()
        if (!res.ok) {
          alert(body.message)
          return
        }
        setLoggedIn(true)
        closeAll()
      } catch (err) {
        console.error(err)
        alert('Network error: Failed to signup.')
      }
    }
  
    // Login handler: calls backend /login
    const handleSignInSubmit = async (data) => {
      try {
        const res = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:    data.email,
            password: data.password
          })
        })
        const body = await res.json()
        if (!res.ok) {
          alert(body.message)
          return
        }
        setLoggedIn(true)
        closeAll()
      } catch (err) {
        console.error(err)
        alert('Network error: Failed to login.')
      }
    }
  
    // Guest flow: no backend call
    const handleContinueGuest = () => {
      setLoggedIn(true)
      closeAll()
    }
  
    // render MainPage when loggedIn
    if (loggedIn) {
      return <MainPage />
    }
  
    // default homepage with modals
    return (
      <div className="absolute inset-0 w-screen h-screen bg-black text-white flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold text-blue-400">HackStarter</div>
          <div className="space-x-4">
            <Button
              className="text-blue-300 hover:text-blue-200"
              onClick={openSignIn}
            >
              Sign in
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white"
              onClick={openRegister}
            >
              Sign up
            </Button>
          </div>
        </nav>
  
        {/* Main Hero */}
        <main className="flex flex-1 flex-col-reverse md:flex-row">
          <div className="flex flex-1 flex-col justify-center px-6 md:px-12">
            <h1 className="text-6xl font-extrabold mb-4">
              Seamless Collaboration
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              Connect, communicate, and create together in real time. Perfect for hackathons and beyond.
            </p>
            <div className="flex space-x-4">
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white"
                onClick={openGuest}
              >
                Get Started
              </Button>
              <Button
                className="border border-blue-500 text-blue-300 hover:text-blue-200"
                onClick={() => {/* learn more */}}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img
              src={logo}
              alt="App logo"
              className="max-w-full max-h-full"
            />
          </div>
        </main>
  
        {/* Footer */}
        <footer className="py-4 text-center text-blue-500">
          &copy; {new Date().getFullYear()} HackStarter. All rights reserved.
        </footer>
  
        {/* Modals */}
        {showRegister && (
          <RegisterModal
            onClose={closeAll}
            onSignIn={openSignIn}
            onSubmit={handleRegisterSubmit}
          />
        )}
        {showSignIn && (
          <SignInModal
            onClose={closeAll}
            onRegister={openRegister}
            onSubmit={handleSignInSubmit}
          />
        )}
        {showGuest && (
          <GuestModal
            onClose={closeAll}
            onContinue={handleContinueGuest}
          />
        )}
      </div>
    )
  }
  
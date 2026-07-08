import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileSetup from './pages/ProfileSetup'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import AuthSuccess from './pages/AuthSuccess'

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          <Routes>

            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth-success' element={<AuthSuccess />} />

            <Route path='profile-setup' element={<ProtectedRoute
              requireProfileComplete={false}>

              <ProfileSetup />

            </ProtectedRoute>} />

            <Route path='/dashboard' element={
              <ProtectedRoute requireProfileComplete={true}>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path='/chat' element={<ProtectedRoute requireProfileComplete={true}>
              <AIChat />
            </ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App

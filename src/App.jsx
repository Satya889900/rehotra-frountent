import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Owners from './pages/Owners'
import Managers from './pages/Managers'
import Tenants from './pages/Tenants'
import Services from './pages/Services'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 min-h-screen">
                <main className="p-4">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="owners" element={<Owners />} />
                    <Route path="managers" element={<Managers />} />
                    <Route path="tenants" element={<Tenants />} />
                    <Route path="services" element={<Services />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
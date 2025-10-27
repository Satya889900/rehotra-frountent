import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Owners from './pages/Owners/Owners'
import OwnerProfile from './pages/Owners/OwnerProfile'
import Managers from './pages/Managers/Managers'
import ManagerProfile from './pages/Managers/ManagerProfile'
import Tenants from './pages/Tanants/Tenants'
import TenantProfile from './pages/Tanants/TenantProfile'
import Notifications from './pages/Notifications'
import Services from './pages/Services/ServicesProfile'
import ServicesPage from './pages/Services/Services'
import SellBuildingPage from './pages/Sell Building & Land/SellBuildingPage'
import PropertyDetails from './pages/Sell Building & Land/PropertyDetails'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 min-h-screen">
                <main className="p-4">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="owners" element={<Owners />} />
                    <Route path="owner-profile" element={<OwnerProfile />} />
                    <Route path="managers" element={<Managers />} />
<Route path="/manager-profile/:id" element={<ManagerProfile />} />
                    <Route path="tenants" element={<Tenants />} />
                    <Route path="tenant-profile/:id" element={<TenantProfile />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="service-details/:id" element={<Services />} />
                    <Route path="sell-building" element={<SellBuildingPage />} />
                    <Route path="property-details/:id" element={<PropertyDetails />} />
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
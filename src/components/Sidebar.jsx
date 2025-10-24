import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
Home,
Users,
ChevronDown,
UserPlus,
UserCog,
User,
Wrench,
Building2,
Settings,
Bell,
ChevronRight,
ChevronLeft
} from 'lucide-react'

export default function Sidebar() {
const [sidebarOpen, setSidebarOpen] = useState(true)
const [userManagementOpen, setUserManagementOpen] = useState(true)

const user = {
name: 'Admin User',
email: 'admin@rehotra.app',
avatar: 'https://via.placeholder.com/32'
}

const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
const toggleUserManagement = () => setUserManagementOpen(!userManagementOpen)
const navWidth = sidebarOpen ? 'w-64' : 'w-20'

return (
<aside
className={`${navWidth} bg-white h-screen p-4 sticky top-0 border-r shadow-sm transition-all duration-300 ease-in-out flex flex-col`}
>
{/* Logo + Toggle */}
  <div className="flex justify-center items-center mb-8">
    <img src="/logos.jpg" alt="Logo" className={`transition-all duration-300 ${sidebarOpen ? 'h-14' : 'h-10'}`} />
  </div>


  {/* Navigation */}
  <nav className="flex-1 space-y-1">
    {/* Dashboard */}
    <NavLink
      to="/"
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`
      }
    >
      <Home size={18} />
      {sidebarOpen && <span>Dashboard Overview</span>}
    </NavLink>

    {/* User Management Dropdown */}
    <div className="space-y-1">
      <div
        onClick={toggleUserManagement}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
          userManagementOpen ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`}
      >
        <Users size={18} />
        {sidebarOpen && (
          <>
            <span>User Management</span>
            <ChevronDown
              size={16}
              className={`ml-auto transition-transform duration-200 ${
                userManagementOpen ? 'rotate-180' : ''
              }`}
            />
          </>
        )}
      </div>
      {userManagementOpen && sidebarOpen && (
        <div className="ml-8 space-y-1 animate-fadeIn">
          <NavLink
            to="/owners"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-yellow-500"
                  : "text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <UserPlus size={14} />
            <span>Owner Management</span>
          </NavLink>
          <NavLink
            to="/managers"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-yellow-500"
                  : "text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <UserCog size={14} />
            <span>Manager Management</span>
          </NavLink>
          <NavLink
            to="/tenants"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-yellow-500"
                  : "text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <User size={14} />
            <span>Tenant Management</span>
          </NavLink>
        </div>
      )}
    </div>

    {/* Services */}
    <NavLink
      to="/services"
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`
      }
    >
      <Wrench size={18} />
      {sidebarOpen && <span>Services</span>}
    </NavLink>

    {/* Sell Building / Land */}
    <NavLink
      to="/sell-building"
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`
      }
    >
      <Building2 size={18} />
      {sidebarOpen && <span>Sell Building / Land</span>}
    </NavLink>
  </nav>

  {/* Sidebar Toggle Button - This is the new position */}
  <div className="py-2">
    <button
      onClick={toggleSidebar}
      className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors ${sidebarOpen ? 'justify-end' : 'justify-center'}`}
    >
      {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  </div>

  {/* Footer */}
  <div className="space-y-2">
    {/* Settings */}
    <NavLink
      to="/settings"
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`
      }
    >
      <Settings size={18} />
      {sidebarOpen && <span>Settings</span>}
    </NavLink>

    {/* Notifications */}
    <NavLink
      to="/notifications"
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors relative ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-900 hover:bg-gray-100"
        } ${!sidebarOpen ? 'justify-center' : ''}`
      }
    >
      <div className="relative">
        <Bell size={18} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border-2 border-white"></div>
      </div>
      {sidebarOpen && <span>Notifications</span>}
    </NavLink>

    {/* User Profile */}
    <div className="pt-4 border-t">
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        {sidebarOpen && (
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user.email}
            </div>
          </div>
        )}
        {sidebarOpen && (
          <ChevronRight size={16} className="text-gray-400 ml-auto flex-shrink-0" />
        )}
      </div>
    </div>
  </div>
</aside>


)
}
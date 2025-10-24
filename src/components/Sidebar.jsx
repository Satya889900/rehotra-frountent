import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Users, UserPlus, User, Wrench } from 'lucide-react'

const items = [
  { to: '/', label: 'Dashboard', icon: <Home size={16} /> },
  { to: '/owners', label: 'Owners', icon: <Users size={16} /> },
  { to: '/managers', label: 'Managers', icon: <UserPlus size={16} /> },
  { to: '/tenants', label: 'Tenants', icon: <User size={16} /> },
  { to: '/services', label: 'Services', icon: <Wrench size={16} /> },
]


export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen p-4 sticky top-0 hidden md:block border-r">
      <div className="px-3 mb-6 flex justify-center">
        <img src="/logos.jpg" alt="Logo" className="h-16" />
      </div>
      <nav className="flex flex-col gap-1">
        {items.map(i => (
          <NavLink key={i.to} to={i.to} className={({isActive}) => `px-3 py-2 rounded-lg flex items-center gap-3 font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
            <div>{i.icon}</div>
            <div>{i.label}</div>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
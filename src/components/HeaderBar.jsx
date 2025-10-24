import React from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

export default function HeaderBar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <button className="md:hidden">Menu</button>
        <h1 className="text-lg font-semibold">Property Management</h1>
      </div>
      <div className="flex items-center gap-4">
        <Bell size={20} />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">A</div>
          <div className="text-sm">Admin</div>
        </div>
      </div>
    </header>
  )
}
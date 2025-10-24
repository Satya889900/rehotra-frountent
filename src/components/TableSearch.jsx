import React from 'react'

export default function TableSearch({ query, setQuery, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="px-3 py-2 border rounded w-full" />
      {children}
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Modal from '../components/Modal'
import TableSearch from '../components/TableSearch'

export default function Owners(){
  const [owners, setOwners] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({name:'', mobile:'', buildings:''})
  const itemsPerPage = 10

  useEffect(()=>{ load() }, [])
  useEffect(()=>{ setCurrentPage(1) }, [query])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/owners')
      setOwners(response.data)
    } catch (err) {
      setError("Failed to fetch owners. Please ensure the API server is running.")
    } finally {
      setLoading(false)
    }
  }

  const save = async ()=>{
    if (editing) {
      await api.put(`/owners/${editing.id}`, {...editing, ...form})
    } else {
      await api.post('/owners', {...form, createdAt: new Date().toISOString().slice(0,10)})
    }
    setEditing(null)
    setOpen(false)
    setForm({name:'', mobile:'', buildings:''})
    load()
  }

  const remove = async (id)=>{ if(!confirm('Delete owner?')) return; await api.delete(`/owners/${id}`); load() }

  const startEdit = (o)=>{ setEditing(o); setForm({name:o.name, mobile:o.mobile, buildings:o.buildings}); setOpen(true) }

  const filtered = owners.filter(o => 
    query === '' ||
    String(o.id).toLowerCase().includes(query.toLowerCase()) ||
    o.name.toLowerCase().includes(query.toLowerCase()) ||
    o.mobile.includes(query) ||
    o.buildings.toLowerCase().includes(query.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedOwners = filtered.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const renderPagination = () => {
    if (totalPages <= 1) return null
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    const paginationItems = []
    if (startPage > 1) {
      paginationItems.push(1)
      if (startPage > 2) paginationItems.push('...')
    }

    pages.forEach(p => {
      if (p !== '...') {
        paginationItems.push(p)
      } else {
        paginationItems.push('...')
      }
    })

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) paginationItems.push('...')
      paginationItems.push(totalPages)
    }

    return paginationItems.map((p, idx) =>
      p === '...' ? (
        <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-500">...</span>
      ) : (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`px-2 py-1 border rounded ${
            p === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      )
    )
  }

  const renderBuildingChips = (buildings) => {
    if (!buildings) return null
    return buildings.split(',').map((b, idx) => (
      <span key={idx} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1">
        {b.trim()}
      </span>
    ))
  }

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Owner Management</h2>
        <div className="flex items-center gap-3">
          <TableSearch 
            query={query} 
            setQuery={setQuery} 
            placeholder="Search ID, phone, owner name, building name" 
          />
          <button 
            onClick={()=>{setEditing(null); setOpen(true)}} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Owner
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building Names</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOwners.map(o=> (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{o.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full"
                          src={o.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(o.name)}&background=6B7280&color=fff&size=40`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{o.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{o.mobile}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {renderBuildingChips(o.buildings)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => startEdit(o)} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                      <button onClick={() => remove(o.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading data...</div>
        )}
        {error && (
          <div className="p-4 text-center text-red-500">{error}</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            {query ? 'No owners found matching your search.' : 'No owners have been added yet.'}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button 
              onClick={() => setCurrentPage(c => Math.max(1, c - 1))} 
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))} 
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filtered.length)}</span> of{' '}
                <span className="font-medium">{filtered.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button 
                  onClick={() => setCurrentPage(c => Math.max(1, c - 1))} 
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" x-description="Heroicon name: chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {renderPagination()}
                <button 
                  onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))} 
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" x-description="Heroicon name: chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      <Modal 
        open={open} 
        onClose={()=>{ 
          setOpen(false); 
          setEditing(null); 
          setForm({name:'', mobile:'', buildings:''}); 
        }} 
        title={editing ? 'Edit Owner' : 'Add Owner'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              placeholder="Name" 
              value={form.name} 
              onChange={e=>setForm({...form, name:e.target.value})} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input 
              placeholder="Mobile Number" 
              value={form.mobile} 
              onChange={e=>setForm({...form, mobile:e.target.value})} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Building Names</label>
            <textarea 
              placeholder="Building Names (comma-separated)" 
              value={form.buildings} 
              onChange={e=>setForm({...form, buildings:e.target.value})} 
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              onClick={()=>{ 
                setOpen(false); 
                setEditing(null); 
                setForm({name:'', mobile:'', buildings:''}); 
              }} 
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={save} 
              className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
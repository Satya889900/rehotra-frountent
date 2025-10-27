import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import TableSearch from '../../components/TableSearch'

function Managers() {
const [managers, setManagers] = useState([
{
id: 'RM213132349876',
name: 'Mahesh Gowda',
mobile: '+91 9123456780',
owner: 'Basavaraj K',
buildings: 'Shanti Nivas, Anandam Residency, Vasudha Complex',
avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
},
{
id: 'RM213132349876',
name: 'Preethi Singh',
mobile: '+91 9123456780',
owner: 'Alok Kumar',
buildings: 'Eco Oasis, Vasudha Complex, Nirvana Nivas',
avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
},
{
id: 'RM213132349876',
name: 'Alex Thompson',
mobile: '+91 9123456780',
owner: 'Alok Kumar',
buildings: 'Shanti Nivas, Archana Builds',
avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
},
{
id: 'RM213132349876',
name: 'Mahesh Gowda',
mobile: '+91 9123456780',
owner: 'Basavaraj K',
buildings: 'Divya Dham, Shanti Nivas',
avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
},
])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [currentPage, setCurrentPage] = useState(1)
const [open, setOpen] = useState(false)
const [editing, setEditing] = useState(null)
const [query, setQuery] = useState('')
const [form, setForm] = useState({ name: '', mobile: '', owner: '', buildings: '' })
const itemsPerPage = 10
const navigate = useNavigate()

useEffect(() => { setCurrentPage(1) }, [query])

const startEdit = (m) => {
navigate(`/manager-profile/${m.id}`, { state: m })
}

const filtered = managers.filter(m =>
query === '' ||
m.id.toLowerCase().includes(query.toLowerCase()) ||
m.name.toLowerCase().includes(query.toLowerCase()) ||
m.owner.toLowerCase().includes(query.toLowerCase()) ||
m.mobile.includes(query) ||
m.buildings.toLowerCase().includes(query.toLowerCase())
)

const indexOfLastItem = currentPage * itemsPerPage
const indexOfFirstItem = indexOfLastItem - itemsPerPage
const paginatedManagers = filtered.slice(indexOfFirstItem, indexOfLastItem)
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

for (let i = startPage; i <= endPage; i++) pages.push(i)
return pages.map(p => (
  <button
    key={p}
    onClick={() => setCurrentPage(p)}
    className={`px-2 py-1 border rounded ${p === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-gray-50'}`}
  >
    {p}
  </button>
))


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
<h2 className="text-xl font-semibold text-gray-900">Manager Management</h2>
<div className="flex items-center gap-3">
<TableSearch query={query} setQuery={setQuery} placeholder="Search By ID, phone, Manager name, Owner Name, building name" />
<button
onClick={() => { setEditing(null); setOpen(true) }}
className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
>
Add Manager
</button>
</div>
</div>

  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Buildings</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedManagers.map(m => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-sm text-gray-900">{m.id}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={m.avatar}
                    alt=""
                  />
                  <div className="ml-4 text-sm font-medium text-gray-900">{m.name}</div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{m.mobile}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{m.owner}</td>
              <td className="px-4 py-4 text-sm text-gray-900">
                <div className="flex flex-wrap gap-1">
                  {renderBuildingChips(m.buildings)}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center gap-3">
                  <button onClick={() => startEdit(m)} className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button onClick={() => alert('Delete Manager')} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {loading && <div className="p-4 text-center text-gray-500">Loading data...</div>}
    {error && <div className="p-4 text-center text-red-500">{error}</div>}
    {!loading && !error && filtered.length === 0 && (
      <div className="p-4 text-center text-gray-500">
        {query ? 'No managers found matching your search.' : 'No managers have been added yet.'}
      </div>
    )}
  </div>

  {totalPages > 1 && (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastItem, filtered.length)}</span> of{' '}
            <span className="font-medium">{filtered.length}</span> results
          </p>
        </div>
        <div className="flex gap-2">{renderPagination()}</div>
      </div>
    </div>
  )}

  <Modal
    open={open}
    onClose={() => { setOpen(false); setEditing(null); setForm({ name: '', mobile: '', owner: '', buildings: '' }) }}
    title={editing ? 'Edit Manager' : 'Add Manager'}
  >
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          placeholder="Manager Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <input
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={e => setForm({ ...form, mobile: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
        <input
          placeholder="Owner Name"
          value={form.owner}
          onChange={e => setForm({ ...form, owner: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Buildings</label>
        <textarea
          placeholder="Building Names (comma-separated)"
          value={form.buildings}
          onChange={e => setForm({ ...form, buildings: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={() => { setOpen(false); setEditing(null); setForm({ name: '', mobile: '', owner: '', buildings: '' }) }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  </Modal>
</div>


)
}
export default Managers
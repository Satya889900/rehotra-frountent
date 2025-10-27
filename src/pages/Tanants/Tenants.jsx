import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import TableSearch from '../../components/TableSearch'

export default function Tenants() {
const [tenants, setTenants] = useState([
{
id: 'RT7131243876',
name: 'Mahesh Gowda',
mobile: '+91 9123456780',
building: 'Ganesh Residency (201)',
moveIn: '01 Feb 2023',
avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
},
{
id: 'RT7131243876',
name: 'Preethi Singh',
mobile: '+91 9123456780',
building: 'Ganesh Residency (201)',
moveIn: '01 Feb 2023',
avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
},
{
id: 'RT7131243876',
name: 'Mahesh Gowda',
mobile: '+91 9123456780',
building: 'Ganesh Residency (201)',
moveIn: '01 Feb 2023',
avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
},
{
id: 'RT7131243876',
name: 'Preethi Singh',
mobile: '+91 9123456780',
building: 'Ganesh Residency (201)',
moveIn: '01 Feb 2023',
avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
},
{
id: 'RT7131243876',
name: 'Mahesh Gowda',
mobile: '+91 9123456780',
building: 'Ganesh Residency (201)',
moveIn: '01 Feb 2023',
avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
},
])

const [query, setQuery] = useState('')
const [open, setOpen] = useState(false)
const [form, setForm] = useState({ name: '', mobile: '', building: '', moveIn: '' })
const [editing, setEditing] = useState(null)
const [page, setPage] = useState(1)
const perPage = 5
const navigate = useNavigate()

const filtered = tenants.filter(
(t) =>
query === '' ||
t.id.toLowerCase().includes(query.toLowerCase()) ||
t.name.toLowerCase().includes(query.toLowerCase()) ||
t.mobile.includes(query) ||
t.building.toLowerCase().includes(query.toLowerCase())
)

const pageCount = Math.ceil(filtered.length / perPage)
const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

return (
<div className="p-6 bg-[#f6f9f3] min-h-screen">
<div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4">
<h2 className="text-lg font-semibold text-gray-900">Tenant Management</h2>
<div className="flex items-center gap-3">
<TableSearch
          query={query}
          setQuery={setQuery}
          placeholder="Search by ID, Phone, or Building Name"
        />
<button
onClick={() => {
          setOpen(true);
          setEditing(null);
}}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
>
Add Tenant
</button>
</div>
</div>

  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tenant ID
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tenant Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Mobile Number
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Building Name & Flat No
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date of Move-In
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {pageItems.map((t, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="px-4 py-4 text-gray-900">{t.id}</td>
            <td className="px-4 py-4 flex items-center">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-8 w-8 rounded-full object-cover mr-3"
              />
              <span className="text-gray-900 font-medium">{t.name}</span>
            </td>
            <td className="px-4 py-4 text-gray-900">{t.mobile}</td>
            <td className="px-4 py-4 text-gray-900">{t.building}</td>
            <td className="px-4 py-4 text-indigo-600 hover:underline cursor-pointer">
              {t.moveIn}
            </td>
            <td className="px-4 py-4 text-right text-sm font-medium">
              <button
                onClick={() => navigate(`/tenant-profile/${t.id}`, { state: t })}
                className="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => alert('Delete tenant')}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {filtered.length === 0 && (
      <div className="p-4 text-center text-gray-500">
        {query ? 'No tenants found matching your search.' : 'No tenants available.'}
      </div>
    )}
  </div>

  {/* Pagination */}
  {pageCount > 1 && (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-50"
      >
        ‹
      </button>
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-50"
      >
        ›
      </button>
    </div>
  )}

  <Modal
    open={open}
    onClose={() => setOpen(false)}
    title={editing ? 'Edit Tenant' : 'Add Tenant'}
  >
    <div className="space-y-4">
      <input
        placeholder="Tenant Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        placeholder="Building & Flat"
        value={form.building}
        onChange={(e) => setForm({ ...form, building: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        placeholder="Move-In Date"
        value={form.moveIn}
        onChange={(e) => setForm({ ...form, moveIn: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />

      <div className="flex justify-end gap-3 pt-3">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 border rounded bg-white text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  </Modal>
</div>


)
}
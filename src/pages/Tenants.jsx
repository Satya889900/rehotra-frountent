import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Modal from '../components/Modal'
import TableSearch from '../components/TableSearch'

export default function Tenants(){
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({name:'', apt:'', rent:0, status:'', phone:''})
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/tenants').then(r=>setItems(r.data))

  const save = async ()=>{
    if (editing) await api.put(`/tenants/${editing.id}`, {...editing, ...form})
    else await api.post('/tenants', form)
    setOpen(false); setForm({name:'',apt:'',rent:0,status:'',phone:''}); load()
  }

  const remove = async (id) => { if(!confirm('Delete tenant?')) return; await api.delete(`/tenants/${id}`); load() }

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.apt.toLowerCase().includes(query.toLowerCase()))
  const perPage = 5
  const pageCount = Math.ceil(filtered.length / perPage)
  const pageItems = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tenant Management</h2>
        <div className="flex items-center gap-3">
          <TableSearch query={query} setQuery={setQuery} />
          <button onClick={()=>{setOpen(true); setEditing(null)}} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Tenant</button>
        </div>
      </div>

      <div className="card overflow-auto">
        <table className="w-full">
          <thead className="text-sm text-slate-500"><tr><th className="p-2">Name</th><th className="p-2">Apt</th><th className="p-2">Rent</th><th className="p-2">Status</th><th className="p-2">Phone</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {pageItems.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.apt}</td>
                <td className="p-2">{i.rent}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded-full text-xs ${i.status==='Paid'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{i.status}</span></td>
                <td className="p-2">{i.phone}</td>
                <td className="p-2">
                  <button onClick={()=>{setEditing(i); setForm({name:i.name,apt:i.apt,rent:i.rent,status:i.status,phone:i.phone}); setOpen(true)}} className="mr-2 text-indigo-600">Edit</button>
                  <button onClick={()=>remove(i.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
        <div>Page {page} / {pageCount}</div>
        <button onClick={()=>setPage(p=>Math.min(pageCount,p+1))} className="px-3 py-1 border rounded">Next</button>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={editing? 'Edit Tenant':'Add Tenant'}>
        <div className="space-y-3">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Apartment" value={form.apt} onChange={e=>setForm({...form,apt:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Rent" type="number" value={form.rent} onChange={e=>setForm({...form,rent:parseInt(e.target.value||0)})} className="w-full px-3 py-2 border rounded" />
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full px-3 py-2 border rounded">
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
          </select>
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end">
            <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
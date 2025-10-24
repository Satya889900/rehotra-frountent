import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Modal from '../components/Modal'
import TableSearch from '../components/TableSearch'

export default function Owners(){
  const [owners, setOwners] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({name:'', email:'', phone:'', flats:''})

  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/owners').then(r=>setOwners(r.data))

  const save = async ()=>{
    if (editing) {
      await api.put(`/owners/${editing.id}`, {...editing, ...form})
    } else {
      await api.post('/owners', {...form, createdAt: new Date().toISOString().slice(0,10)})
    }
    setOpen(false); setForm({name:'',email:'',phone:'',flats:''}); load()
  }

  const remove = async (id)=>{ if(!confirm('Delete owner?')) return; await api.delete(`/owners/${id}`); load() }

  const startEdit = (o)=>{ setEditing(o); setForm({name:o.name,email:o.email,phone:o.phone,flats:o.flats}); setOpen(true) }

  const filtered = owners.filter(o => o.name.toLowerCase().includes(query.toLowerCase()) || o.email.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Owner Management</h2>
        <div className="flex items-center gap-3">
          <TableSearch query={query} setQuery={setQuery} />
          <button onClick={()=>{setEditing(null); setOpen(true)}} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Owner</button>
        </div>
      </div>

      <div className="card overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-slate-500">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Flats</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o=> (
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.name}</td>
                <td className="p-2">{o.email}</td>
                <td className="p-2">{o.phone}</td>
                <td className="p-2">{o.flats}</td>
                <td className="p-2">
                  <button onClick={()=>startEdit(o)} className="mr-2 text-indigo-600">Edit</button>
                  <button onClick={()=>remove(o.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={editing? 'Edit Owner':'Add Owner'}>
        <div className="space-y-3">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Flats" value={form.flats} onChange={e=>setForm({...form,flats:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end">
            <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
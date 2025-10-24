import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Modal from '../components/Modal'

export default function Managers(){
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({name:'', phone:'', buildings:''})
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/managers').then(r=>setItems(r.data))
  const save = async ()=>{
    if (editing) await api.put(`/managers/${editing.id}`, {...editing, ...form})
    else await api.post('/managers', form)
    setOpen(false); setForm({name:'',phone:'',buildings:''}); load()
  }
  const remove = async (id)=>{ if(!confirm('Delete manager?')) return; await api.delete(`/managers/${id}`); load() }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manager Management</h2>
        <button onClick={()=>{setEditing(null); setOpen(true)}} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Manager</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full">
          <thead className="text-sm text-slate-500"><tr><th className="p-2">Name</th><th className="p-2">Phone</th><th className="p-2">Buildings</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {items.map(i=> (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.phone}</td>
                <td className="p-2">{i.buildings}</td>
                <td className="p-2">
                  <button onClick={()=>{setEditing(i); setForm({name:i.name,phone:i.phone,buildings:i.buildings}); setOpen(true)}} className="mr-2 text-indigo-600">Edit</button>
                  <button onClick={()=>remove(i.id)} className="text-red-600">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={editing? 'Edit Manager':'Add Manager'}>
        <div className="space-y-3">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Buildings" value={form.buildings} onChange={e=>setForm({...form,buildings:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end">
            <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
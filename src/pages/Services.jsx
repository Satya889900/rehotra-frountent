import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Modal from '../components/Modal'

export default function Services(){
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({name:'',role:'',phone:'',active:true})
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/services').then(r=>setItems(r.data))
  const save = async ()=>{
    if (editing) await api.put(`/services/${editing.id}`, {...editing, ...form})
    else await api.post('/services', form)
    setOpen(false); setForm({name:'',role:'',phone:'',active:true}); load()
  }
  const remove = async (id)=>{ if(!confirm('Delete?')) return; await api.delete(`/services/${id}`); load() }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <button onClick={()=>{setOpen(true); setEditing(null)}} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Staff</button>
      </div>

      <div className="card overflow-auto">
        <table className="w-full">
          <thead className="text-sm text-slate-500"><tr><th className="p-2">Name</th><th className="p-2">Role</th><th className="p-2">Phone</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.role}</td>
                <td className="p-2">{i.phone}</td>
                <td className="p-2"><span className={`px-2 py-1 rounded-full text-xs ${i.active? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{i.active? 'Active':'Inactive'}</span></td>
                <td className="p-2">
                  <button onClick={()=>{setEditing(i); setForm({name:i.name,role:i.role,phone:i.phone,active:i.active}); setOpen(true)}} className="mr-2 text-indigo-600">Edit</button>
                  <button onClick={()=>remove(i.id)} className="text-red-600">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={editing? 'Edit Staff':'Add Staff'}>
        <div className="space-y-3">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-3 py-2 border rounded" />
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} /> Active</label>
          <div className="flex justify-end"><button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button></div>
        </div>
      </Modal>
    </div>
  )
}
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');

  const API = process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api';

  useEffect(()=>{ fetchDoctors(); }, []);
  const fetchDoctors = async ()=>{ const r = await axios.get(`${API}/doctors`); setDoctors(r.data); }

  const add = async ()=>{
    if(!name||!spec) return alert('fill');
    await axios.post(`${API}/doctors`, { name, specialization: spec });
    setName(''); setSpec('');
    fetchDoctors();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <div className="card mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="border p-2 mr-2" placeholder="Name" />
        <input value={spec} onChange={e=>setSpec(e.target.value)} className="border p-2 mr-2" placeholder="Specialization" />
        <button onClick={add} className="btn">Add Doctor</button>
      </div>
      <div className="card">
        <ul>
          {doctors.map(d=> <li key={d.id}>{d.name} - {d.specialization}</li>)}
        </ul>
      </div>
    </div>
  );
}

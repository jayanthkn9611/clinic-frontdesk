import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [apps, setApps] = useState([]);

  const API = process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api';

  useEffect(()=>{ fetchDoctors(); fetchApps(); }, []);

  const fetchDoctors = async ()=>{ const r = await axios.get(`${API}/doctors`); setDoctors(r.data); }
  const fetchApps = async ()=>{ const r = await axios.get(`${API}/appointments`); setApps(r.data); }

  const book = async ()=>{
    if(!patient||!doctorId||!date||!time) return alert('fill all');
    await axios.post(`${API}/appointments`, { patientName: patient, doctorId: parseInt(doctorId), date, time });
    setPatient(''); setDoctorId(''); setDate(''); setTime('');
    fetchApps();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="card mb-4">
        <input value={patient} onChange={e=>setPatient(e.target.value)} className="border p-2 mr-2" placeholder="Patient name" />
        <select value={doctorId} onChange={e=>setDoctorId(e.target.value)} className="border p-2 mr-2">
          <option value=''>Select doctor</option>
          {doctors.map(d=> <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
        </select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border p-2 mr-2" />
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border p-2 mr-2" />
        <button onClick={book} className="btn">Book</button>
      </div>
      <div className="card">
        <h2 className="font-semibold mb-2">Booked Appointments</h2>
        <ul>
          {apps.map(a=> <li key={a.id}>{a.patientName} with {a.doctor?.name} on {a.date} at {a.time} ({a.status})</li>)}
        </ul>
      </div>
    </div>
  );
}

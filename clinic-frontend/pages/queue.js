import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Queue() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const API = process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/queue`);
    setItems(res.data);
  };

  const add = async () => {
    if (!name) return alert('Enter name');
    await axios.post(`${API}/queue`, { patientName: name });
    setName('');
    fetchItems();
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/queue/${id}/status`, { status });
    fetchItems();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Queue</h1>
      <div className="card mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="border p-2 mr-2" placeholder="Patient name" />
        <button onClick={add} className="btn">Add to Queue</button>
      </div>
      <div className="card">
        <table className="min-w-full">
          <thead><tr><th>#</th><th>Name</th><th>Queue #</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{idx+1}</td>
                <td>{it.patientName}</td>
                <td>{it.queueNumber}</td>
                <td>{it.status}</td>
                <td>
                  <select value={it.status} onChange={e=>updateStatus(it.id, e.target.value)} className="border p-1">
                    <option>Waiting</option>
                    <option>With Doctor</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

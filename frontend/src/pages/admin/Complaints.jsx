import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get('/admin/complaints')
        setComplaints(data.complaints || [])
      } catch (err) {
        setComplaints([])
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complaints</h1>
      {loading ? <div className="h-64 bg-gray-100 rounded-xl animate-pulse" /> : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c._id} className="p-4 border rounded-xl">
              <p className="font-medium">{c.subject}</p>
              <p className="text-sm text-gray-500">{c.user?.name} • {c.status}</p>
              <p className="text-gray-600 mt-2">{c.description}</p>
            </div>
          ))}
          {complaints.length === 0 && <p className="text-center text-gray-500 py-12">No complaints.</p>}
        </div>
      )}
    </div>
  )
}

"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@app/actions/useractions';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      getData();
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setFormData(u);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await updateProfile(formData, session.user.name);
    alert("Profile Updated");
  };

  return (
    <div className=" text-black flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md color-color">
        <h1 className="text-2xl font-bold mb-6 text-black">Welcome to Your Dashboard</h1>
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Profile Picture:</label>
            <input
              type="text"
              name="profilepic"
              value={formData.profilepic || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Razorpay Id:</label>
            <input
              type="password"
              name="razorpayid"
              value={formData.razorpayid || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Razorpay Secret:</label>
            <input
              type="password"
              name="razorpaysecret"
              value={formData.razorpaysecret || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

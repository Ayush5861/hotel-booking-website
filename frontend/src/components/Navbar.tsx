import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("accessToken")
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const navigate = useNavigate()
      const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
   navigate('/login');
  };
  return (
   <>
   <div className='flex justify-between p-4 h-17 bg-gray-400'>
    <div>
        <h1>Hotel Management</h1>
    </div>
    {
    token ? (
     <div className='flex mr-6'>
        <div className='mr-10'>
        <p>Welcome {user.role} {user.name}</p>
        </div>
    <button onClick={logout} className='cursor-pointer'>Logout</button>
    </div>
        ):
    null
    }
   
   </div>
   </>
  )
}

export default Navbar
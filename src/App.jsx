import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import authService from './appwrite/auth';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import { login, logout } from './store/authSlice';
function App() {
    
  const [loading,setloading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser().then(
      (userdata)=>{
        if(userdata)
        dispatch(login({userdata}))
      else{
        dispatch(logout())
      }
    }
    ).finally(()=>setloading(false))
    }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>TODO
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App

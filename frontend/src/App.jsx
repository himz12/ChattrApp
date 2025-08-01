import { useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { useThemeStore } from './store/useThemeStore.js';
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
const App=()=> {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-baseline justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser? <HomePage /> :<Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser? <SignupPage />: <Navigate to='/'/>} />
        <Route path='/login' element={!authUser? <LoginPage /> : <Navigate to='/'/>} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser? <ProfilePage />:<Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;

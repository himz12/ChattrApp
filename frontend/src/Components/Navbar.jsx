import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <header 
      className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                <MessageSquare className='w-5 h-5 text-primary' />
              </div>
              <h1 className='text-lg font-bold'>Chattr</h1>
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <Link to={`/settings`} className='btn btn-sm gap-2 flex flex-row items-center transition-colors'>
              <Settings className='w-4 h-4' />
              <span className='hidden sm:inline'>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className='btn btn-sm gap-2 flex flex-row items-center'>
                  <User className='w-4 h-4' />
                  <span className='hidden sm:inline'>Profile</span>
                </Link>
                <button className='btn btn-sm gap-2 flex flex-row items-center' onClick={logout}>
                  <LogOut className='w-4 h-4' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

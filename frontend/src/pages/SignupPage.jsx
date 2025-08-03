import {useState} from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare, User, Mail, EyeOff,Eye,Lock,Loader2} from 'lucide-react';
import {Link} from 'react-router-dom'
import AuthImagePattern from '../Components/AuthImagePattern';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [form,setForm]=useState({
    fullName:"",
    email:"",
    password:""
  })
  
  const{signup,isSignup} = useAuthStore()

  const validateForm = () => {
    
    if (!form.fullName.trim()) return toast.error("Full name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email format");
    if (!form.password) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const success = validateForm();
  if (success === true) signup(form);
};

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get Started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40'/>
                </div>
                <input 
                type='text'
                className={`input input-bordered w-full pl-10`}
                placeholder='Enter your Full Name'
                value={form.fullName}
                onChange={(e)=>setForm({...form,fullName:e.target.value})}/>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40'/>
                </div>
                <input 
                type='email'
                className={`input input-bordered w-full pl-10`}
                placeholder='Enter your Email'
                value={form.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}/>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40'/>
                </div>
                <input 
                type={showPassword ? 'text':'password'}
                className={`input input-bordered w-full pl-10`}
                placeholder='Enter your Password'
                value={form.password}
                onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40'/>
                  ):(
                    <Eye className='size-5 text-base-content/40'/>
                  )}</button>
              </div>
            </div>

            <button type='submit' className='bg-blue-950 text-amber-50 cursor-pointer btn btn-primary w-full' disabled={isSignup}>
              {isSignup?(
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                </>
              ):"Create Account"}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account {""}
              <Link to="/login" className='link link-primary'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
      title="Connect. Chat. Belong."
      subtitle="Where conversations turn into connections."/>
    </div>
  )
}

export default SignupPage

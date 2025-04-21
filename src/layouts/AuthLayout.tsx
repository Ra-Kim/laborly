import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='bg-white w-screen h-full min-h-screen'><Outlet /></div>
  )
}

export default AuthLayout
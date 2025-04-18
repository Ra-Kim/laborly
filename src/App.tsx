import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Artisans from './Pages/Artisans'
import ArtisanProfile from './Pages/ArtisanProfile'
import Blog from './Pages/Blog'
import NotFound from './Pages/NotFound'
import Login from './Pages/auth/login'
import Signup from './Pages/auth/signup'
import Navbar from '@/components/Navbar.tsx'




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artisans' element={<Artisans />} />
        <Route path='/artisans/:artisanId' element={<ArtisanProfile />} />

        <Route path='/blog' element={<Blog />} />
        <Route path='*' element={<NotFound />} />
        {/*  */}
        <Route path='/auth/sign-in' element={<Login />} />
        <Route path='/auth/sign-up' element={<Signup />} />

      </Routes>
    </>
  )
}

export default App
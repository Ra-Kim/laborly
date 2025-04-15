import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Artisans from './Pages/Artisans'
import ArtisanProfile from './Pages/ArtisanProfile'
import NotFound from './Pages/NotFound'
import Navbar from './Components/Navbar'
import Blog from './Pages/Blog'
import ArtisansSignIn from './Pages/UserSignUp/ArtisansSignIn'
import ArtisansSignUp from './Pages/UserSignUp/ArtisansSignUp'


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
        <Route path='/artisans-sign-in' element={<ArtisansSignIn />} />
        <Route path='/artisans-sign-up' element={<ArtisansSignUp />} />

      </Routes>
    </>
  )
}

export default App
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Artisans from "./Pages/Artisans";
import ArtisanProfile from "./Pages/ArtisanProfile";
import Blog from "./Pages/Blog";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/auth/login";
import Signup from "./Pages/auth/signup";
import Navbar from "@/Components/common/Navbar";
import { useMemo } from "react";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  const { pathname } = useLocation();
  const showNavbar = useMemo(() => {
    if (pathname.includes("auth")) return false;
    return true;
  }, [pathname]);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:artisanId" element={<ArtisanProfile />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
        {/*  */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

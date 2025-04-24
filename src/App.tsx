import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Artisans from "./Pages/Artisans";
import ArtisanProfile from "./Pages/ArtisanProfile";
import Blog from "./Pages/Blog";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/auth/login";
import Signup from "./Pages/auth/signup";
import Navbar from "@/Components/common/Navbar";
import { useEffect, useMemo } from "react";
import AuthLayout from "./layouts/AuthLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import ClientLayout from "./layouts/ClientLayout";
import WorkerDashboard from "./Pages/worker/Dashboard";
import ClientDashboard from "./Pages/client/Dashboard";
import { useAuth } from "./hooks/useAuth";
import useRedirectByRole from "./hooks/useRedirectByRole";
import WorkerRoute from "./routes/WorkerRoute";
import ClientRoute from "./routes/ClientRoute";
import MyJobs from "./Pages/worker/MyJobs";

const App = () => {
	const location = useLocation();
	const hideNavbarRoutes = ["/client", "/client/dashboard", "/worker", "/worker/my-jobs"];

	// const { pathname } = useLocation();

	// const showNavbar = useMemo(() => {
	//   if (pathname.includes("auth")) return false;
	//   return true;
	// }, [pathname]);

	// const { isAuthenticated, role, logout } = useAuth();
	// const navigate = useNavigate();
	// const location = useLocation();

	// useEffect(() => {
	//   if (!isAuthenticated() && !location.pathname.startsWith("/auth")) {
	//     navigate("/auth/sign-in");
	//   }

	//   if (isAuthenticated() && location.pathname === "/") {
	//     if (role === "WORKER") {
	//       navigate("/worker/dashboard");
	//       return;
	//     }
	//     if (role === "CLIENT") {
	//       navigate(`/client/dashboard`);
	//       return;
	//     }
	//     logout();
	//   }
	// }, [isAuthenticated, navigate, location.pathname, role]);
	// useRedirectByRole();
	return (
		<>
			{!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

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

				{/*  */}

				<Route path="/worker" element={<WorkerLayout />}>
					<Route index element={<WorkerDashboard />} />
					<Route path="my-jobs" element={<MyJobs />} />
				</Route>
				<Route path="/client" element={<ClientLayout />}>
					<Route path="dashboard" element={<ClientDashboard />} />
					
				</Route>
			</Routes>
		</>
	);
};

export default App;

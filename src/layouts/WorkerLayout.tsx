import { useState, useEffect, ReactNode, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaUserCircle, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { BsChatDotsFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import profilePhoto from "../assets/user-photo.png";
import logo from "../assets/laborly-logo.png";
import { HiHome } from "react-icons/hi";
import { MdHomeRepairService } from "react-icons/md";
import { IUser } from "@/types/auth";

const WorkerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);

  // Handle screen size for collapsibility
  function useIsMediumUp() {
    const [isMediumUp, setIsMediumUp] = useState(window.innerWidth >= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMediumUp(window.innerWidth >= 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMediumUp;
  }

  const isMediumUp = useIsMediumUp();

  // Collapsed state management based on screen size
  useEffect(() => {
    setCollapsed(!isMediumUp);
  }, [isMediumUp]);

  const handleLogout = () => {
    alert("Logging out...");
  };

  const SidebarLink = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: ReactNode;
    label: string;
  }) => {
    const isActive = location.pathname === to;
    return (
      <MenuItem
        icon={icon}
        className="relative group"
        onClick={() => {
          navigate(to);
          if (window.innerWidth < 768) setCollapsed(true);
        }}
      >
        {!collapsed ? (
          <span
            className={`text-sm ${isActive ? "text-primary font-medium" : ""}`}
          >
            {label}
          </span>
        ) : (
          <span
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap 
                        bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 z-50"
          >
            {label}
          </span>
        )}
      </MenuItem>
    );
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onMouseEnter={() => isMediumUp && setCollapsed(false)}
        onMouseLeave={() => isMediumUp && setCollapsed(true)}
        className={`bg-white soft-shadow text-darkPrimary transition-all duration-300 
                ${collapsed ? "w-10" : isMediumUp ? "w-[250px]" : "w-[80px]"} 
                fixed md:relative z-30 h-full overflow-hidden`}
      >
        <div className="mt-4 py-3">
          <img
            src={logo}
            alt="Laborly Logo"
            className="w-[80%] sm:w-full max-w-[100px] mx-auto"
          />
        </div>

        <div className="max-w-[80%] mx-auto my-5 text-center">
          <img
            src={profilePhoto}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover mx-auto"
          />
        </div>

        {/* Menu Items */}
        <Menu className="text-sm overflow-hidden">
          <SidebarLink to="/worker/dashboard" icon={<HiHome />} label="Dashboard" />

          <SidebarLink to="/worker/my-jobs" icon={<FaTasks />} label="My Jobs" />
          <SidebarLink
            to="/worker/my-services"
            icon={<MdHomeRepairService />}
            label="Services"
          />
          <SidebarLink
            to="messages"
            icon={<BsChatDotsFill />}
            label="Messages"
          />
          <SidebarLink
            to="user-profile"
            icon={<FaUserCircle />}
            label="Profile"
          />
          <SidebarLink to="user-profile" icon={<BiSupport />} label="Support" />

          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden transition-all duration-300 pl-2 sm:pl-8">
        {/* Top bar */}
        <div className="bg-white soft-shadow w-full p-4 rounded-lg sticky top-0 z-20 flex justify-between items-center">
          <p className="text-darkPrimary font-bold text-lg">Welcome , {user.first_name} {user.last_name}</p>
          <div>
            <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white card-shadow mx-2">
              <IoNotifications className="text-xl text-secondary" />
              <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                5
              </span>
            </div>
          </div>
        </div>

        {/* Main outlet */}
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WorkerLayout;

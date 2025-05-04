import { ChevronLeft, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { ReactNode, useMemo, useState } from "react";
import { Sidebar, MenuItem, Menu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/laborly-logo.png";
import { useAppSelector } from "@/redux/store";
import { IUser } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { FaUserCircle, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import LogoutModal from "@/Components/modals/Logout";
import { BiSupport } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";

const WorkerHamMenu = () => {
  const [menu, setMenu] = useState(false);
  const { workerProfilePicture } = useAppSelector(({ worker }) => worker);
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
      setLogout(!logout);
      setMenu(false)
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
    const navigate = useNavigate();

    return (
      <MenuItem
        icon={icon}
        className="relative group"
        onClick={() => {
          navigate(to);
          setMenu(false);
        }}
      >
        <span
          className={`text-sm ${isActive ? "text-primary font-semibold" : ""}`}
        >
          {label}
        </span>
      </MenuItem>
    );
  };

  return (
    <div>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="px-2 pt-0 w-[250px] lg:min-w-[550px]"
        >
          <SheetTitle className="flex gap-2 py-4 items-center">
            <div onClick={() => setMenu(false)}>
              <ChevronLeft size={24} className="cursor-pointer w-6 h-6" />
            </div>
          </SheetTitle>
          <Sidebar
            collapsed={false}
            className={`bg-white text-darkPrimary w-full transition-all duration-300 fixed md:relative z-30 h-full overflow-hidden`}
          >
            <div className="mt-4 py-3">
              <img
                src={logo}
                alt="Laborly Logo"
                className="w-[80%] sm:w-full max-w-[100px] mx-auto"
              />
            </div>

            <div className="rounded-full w-16 h-16 mx-auto">
              <Avatar className="w-full h-full">
                <AvatarImage src={workerProfilePicture} alt="pic" />
                <AvatarFallback className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {user.first_name?.charAt(0)}
                  {user.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Menu Items */}
            <Menu className="text-sm overflow-hidden">
              <SidebarLink
                to="/worker/dashboard"
                icon={<HiHome />}
                label="Dashboard"
              />

              <SidebarLink
                to="/worker/my-jobs"
                icon={<FaTasks />}
                label="My Jobs"
              />
              <SidebarLink
                to="/worker/my-services"
                icon={<MdHomeRepairService />}
                label="Services"
              />
              <SidebarLink
                to="/worker/messages"
                icon={<BsChatDotsFill />}
                label="Messages"
              />
              <SidebarLink
                to="/worker/user-profile"
                icon={<FaUserCircle />}
                label="Profile"
              />
              <SidebarLink
                to="/worker/reviews"
                icon={<BiSupport />}
                label="Reviews"
              />

              <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                Log out
              </MenuItem>
            </Menu>
          </Sidebar>
        </SheetContent>
      </Sheet>
      {logout && <LogoutModal setLogoutModal={setLogout} />}
    </div>
  );
};

export default WorkerHamMenu;

import { useContext, useState } from "react";
import DoctorsDashboard from "../pages/dashboards/DoctorsDashboard";
import PatientsDashboard from "../pages/dashboards/PatientsDashboard";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiCloseLargeFill } from "react-icons/ri";
import Logo from "./Logo";
import Search from "./Search";
import NotificationBell from "./NotificationBell";
import { growl } from "../utils/growl";
import { logoutAPI } from "../features/auth/auth-service";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../pages/Root";

export const NavigationPanel = () => {
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const renderRoleNav = () => {
    switch (currentUser?.role) {
      case "DOCTOR":
        return <DoctorsDashboard />;
      case "PATIENT":
        return <PatientsDashboard />;
      default:
        return null;
    }
  };

  const logout = async () => {
    try {
      const response = await logoutAPI();
      if (response.success) {
        navigate("/login");
        growl(response.message, "success");
      } else {
        growl(response.message, "error");
      }
    } catch (error: any) {
      console.error("Logout failed:", error);
      growl(error.message, "error");
    }
  };

  return (
    <>
      <div
        className={`p-3 flex fixed top-0 left-0 h-16 w-full align-center bg-base-100 transform transition-transform duration-300 ${
          !open ? "translate-y-0" : "-translate-y-full"
        } shadow-sm lg:hidden`}
      >
        <div className="navbar-start">
          <div
            className="btn btn-ghost btn-circle"
            tabIndex={0}
            role="button"
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
          >
            <TfiMenuAlt className="text-2xl" />
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl pt-5">
            <Logo />
            <p></p>
          </a>
        </div>
        <div className="navbar-end">
          <Search />
          <NotificationBell />
        </div>
      </div>
      <aside
        className={`fixed top-0 left-0 h-screen bg-base-200 border-r-1 border-r-base-100 p-4 w-45 z-50 transform transition-transform duration-300 
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative`}
      >
        <div className="mb-4 lg:mb-0">
          <div
            className="btn btn-ghost btn-circle hover:bg-base-100 lg:hidden"
            tabIndex={0}
            role="button"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <RiCloseLargeFill className="text-2xl" />
          </div>
        </div>
        <nav>
          {renderRoleNav()}
          <button
            className="btn btn-sm w-full justify-start mt-24 flex gap-2 hover:bg-base-100"
            onClick={logout}
          >
            <RiLogoutCircleRLine className="mt-1" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
};

export default NavigationPanel;

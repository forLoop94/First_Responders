import { useState } from "react";
import { Role } from "../enums/auth/e-auth";
import DoctorsDashboard from "../pages/dashboards/DoctorsDashboard";
import PatientsDashboard from "../pages/dashboards/PatientsDashboard";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrFormClose } from "react-icons/gr";

export const NavigationPanel = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(Role.Doctor);

  const renderRoleNav = () => {
    switch (role) {
      case Role.Doctor:
        return <DoctorsDashboard />;
      case Role.Patient:
        return <PatientsDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="absolute top-2 left-2 lg:hidden p-2">
        <button onClick={() => setOpen(true)} aria-label="Open Menu">
          <TfiMenuAlt className="text-2xl" />
        </button>
      </div>
      <aside
        className={`fixed top-0 left-0 h-screen bg-base-200 border-r-1 border-r-base-100 p-4 w-45 z-50 transform transition-transform duration-300 
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative`}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <GrFormClose />
          </button>
        </div>

        <nav>
          {renderRoleNav()}
          <button className="btn btn-sm w-full justify-start mt-24 flex gap-2 hover:bg-base-100">
            <RiLogoutCircleRLine className="mt-1" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
};

export default NavigationPanel;

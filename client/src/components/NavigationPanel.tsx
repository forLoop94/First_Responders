import { useState } from "react";
import { Role } from "../enums/auth/e-auth";
import DoctorsDashboard from "../pages/dashboards/DoctorsDashboard";
import PatientsDashboard from "../pages/dashboards/PatientsDashboard";

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
      {/* Mobile Toggle Button */}
      <div className="absolute top-0 lg:hidden p-2">
        <button onClick={() => setOpen(true)} aria-label="Open Menu">
          test Icon
        </button>
      </div>

      {/* Side Panel */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-base-200 border-r-1 border-r-base-100 p-4 w-32 z-50 transform transition-transform duration-300 
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:w-50`}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            test close
          </button>
        </div>

        <nav className="flex flex-col space-y-2">{renderRoleNav()}</nav>
      </aside>
    </>
  );
};

export default NavigationPanel;

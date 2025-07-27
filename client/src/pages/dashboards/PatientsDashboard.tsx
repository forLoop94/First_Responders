import { Link, useLocation } from "react-router-dom";

const PatientsDashboard: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-primary" : "";

  return (
    <div className="flex flex-col space-y-2">
      <Link
        to="/dashboard"
        className={`btn btn-ghost ${isActive("/dashboard")}`}
      >
        Dashboard
      </Link>
      <Link
        to="/dashboard/appointments"
        className={`btn btn-ghost ${isActive("/dashboard/appointments")}`}
      >
        Appointments
      </Link>
    </div>
  );
};

export default PatientsDashboard;

import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { TbWheelchair } from "react-icons/tb";
import { FcDepartment } from "react-icons/fc";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { SiWebmoney } from "react-icons/si";
import { FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Logo from "../../components/Logo";

const DoctorsDashboard: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-primary text-secondary-content" : "";

  return (
    <div className="flex flex-col">
      <Logo />
      <small className="text-xs mb-2">General</small>
      <Link
        to="/dashboard"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "/dashboard"
        )}`}
      >
        <RxDashboard />
        Dashboard
      </Link>

      <Link
        to="/appointments"
        className={`btn relative btn-sm btn-ghost w-full justify-start hover:bg-base-100 ${isActive(
          "/appointments"
        )}`}
      >
        <SlCalender />
        Appointments
        <div className="badge badge-secondary badge-xs">+99</div>
      </Link>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "#"
        )}`}
      >
        <TbWheelchair />
        Patients
      </Link>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "/#"
        )}`}
      >
        <FcDepartment />
        Departments
      </Link>
      <small className="text-xs mb-2 mt-5">Reports</small>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "#"
        )}`}
      >
        <TbBrandGoogleAnalytics />
        Analytics
      </Link>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "/#"
        )}`}
      >
        <SiWebmoney />
        Financial
      </Link>
      <small className="text-xs mb-2 mt-5">Settings</small>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "#"
        )}`}
      >
        <FiHelpCircle />
        Help & Support
      </Link>
      <Link
        to="#"
        className={`btn btn-sm btn-ghost justify-start hover:bg-base-100 ${isActive(
          "/#"
        )}`}
      >
        <IoSettingsOutline />
        Settings
      </Link>
    </div>
  );
};

export default DoctorsDashboard;

import React from "react";
import { Outlet } from "react-router-dom";
import NavigationPanel from "../components/NavigationPanel";

const Root: React.FC = () => {
  return (
    <div className="flex">
      <NavigationPanel />
      <main className="flex-grow p-4 bg-base-200 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;

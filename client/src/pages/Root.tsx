import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import NavigationPanel from "../components/NavigationPanel";
import { createContext } from "react";
import { ICurrentUser } from "../interfaces/i-users";

export const UserContext = createContext<ICurrentUser | null>(null);

const Root: React.FC = () => {
  const data = useLoaderData() as ICurrentUser;
  return (
    <UserContext.Provider value={data}>
      <div className="flex">
        <NavigationPanel />
        <main className="flex-grow p-4 bg-base-200 h-screen">
          <Outlet />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default Root;

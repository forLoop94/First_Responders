import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./features/auth/components/Login";
import Growl from "./components/Growler";
import Root from "./pages/Root";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import Register from "./features/auth/components/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import PatientsUI from "./pages/PatientsUI";
import Landing from "./pages/Landing";
import HomeLayout from "./pages/HomeLayout";

import { loader as rootLoader } from "./loaders/rootLoader";
import { loader as patientsLoader } from "./loaders/patientsLoader";
import { loader as programsLoader } from "./features/programs/program-loader";
import Success from "./pages/Success";
import Programs from "./features/programs/Program";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:id/:resetString",
        element: <ResetPassword />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "dashboard",
        element: <Root />,
        loader: rootLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "appointments",
            element: <Appointments />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "patients",
            element: <PatientsUI />,
            loader: patientsLoader(queryClient),
          },
          {
            path: "programs",
            element: <Programs />,
            loader: programsLoader(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Growl />
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;

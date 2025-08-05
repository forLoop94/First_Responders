import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/auth/Login";
import Growl from "./components/Growler";
import Root from "./pages/Root";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import PatientsUI from "./pages/PatientsUI";
import Landing from "./pages/Landing";
import HomeLayout from "./pages/HomeLayout";

import { loader as rootLoader } from "./loaders/rootLoader";
import { loader as patientsLoader } from "./loaders/patientsLoader";

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

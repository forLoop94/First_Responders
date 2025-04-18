import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Growl from "./components/Growler";
import Root from "./pages/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const App = () => (
  <>
    <Growl />
    <RouterProvider router={router} />
  </>
);

export default App;

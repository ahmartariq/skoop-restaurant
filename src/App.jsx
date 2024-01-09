import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./screens/Login";
import DashboardLayout from "./screens/DashboardLayout";
import Dashboard from "./screens/Dashboard";
import Products from "./screens/Products";
import Stats from "./screens/Stats";
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import Auth from "./Components/Auth";
import Register from "./screens/Register";
import GetDocument from "./screens/GetDocument";
import Deals from "./screens/Deals";
import Orders from "./screens/Orders";
import Profile from "./screens/Profile";
import Timings from "./screens/Timings";
import Wallet from "./screens/Wallet";
import Inventory from "./screens/Inventory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/get-document",
        element: <GetDocument />,
      },
      {
        path: "/",
        element: <DashboardLayout/>,
        children: [
          {
            path: "/",
            element: <Dashboard/>,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/inventory",
            element: <Inventory />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/deals",
            element: <Deals />,
          },
          {
            path: "/timings",
            element: <Timings />,
          },
          {
            path: "/stats",
            element: <Stats />,
          },
          {
            path: "/wallet",
            element: <Wallet />,
          },
          {
            path: "/feedback",
            element: <h1>feedback</h1>,
          },
          {
            path: "/reports",
            element: <h1>reports</h1>,
          }
        ]
      },
    ]
  }
 
]);


export default function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  );
}
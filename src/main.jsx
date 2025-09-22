import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserTable from "./components/UserTable.jsx";
import Login from "./components/Login.jsx";
import TaskLists from "./components/TaskLists.jsx";
import Tasks from "./components/Tasks.jsx";
import Admin from "./components/Admin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
      {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path:'',
                element:<UserTable/>
            },
          {
            path: "users",
            element: <UserTable />,
          },
          {
            path: "lists",
            element: <TaskLists />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
        ],
      }])
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
  </RouterProvider>
);

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Login from "./components/signin/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/feed",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
            path: "/feed",
            element: <Home />,
          },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

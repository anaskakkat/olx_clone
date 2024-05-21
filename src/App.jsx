import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import Create from "./pages/Create";
import ViewPost from "./pages/ViewPost";
import Posts from "./store/PostContext";
import ProtectedRoute from "./store/ProtectedRoute";

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log("userCurernt", currentUser);
      setUser(currentUser);
    });
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute>
          <SignUp />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
        
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/view",
      element: <ViewPost />,
    },
  ]);
  return (
    <>
      <Posts>
        <RouterProvider router={router} />
      </Posts>
    </>
  );
}

export default App;

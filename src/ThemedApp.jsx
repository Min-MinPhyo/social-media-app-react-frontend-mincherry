import { useState, createContext, useContext, useMemo, useEffect } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import Comments from "./pages/Comments";
import { deepPurple, grey } from "@mui/material/colors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template";
import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./pages/Profile";
import { fetchVerify } from "./libs/fetcher";
import Search from "./pages/Search";
import Notis from "./pages/Notis";
import AppSocket from "./AppSocket";

const AppContext = createContext();
export const queryClient = new QueryClient();

export function useApp() {
  return useContext(AppContext);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/comments/:id",
        element: <Comments />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
       path:"/likes/:id/:type",
       element:<Likes/>
      },
      
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/notis",
        element:<Notis/>

      }
    ],
  },
]);

export default function ThemedApp() {

  const [showDrawer, setShowDrawer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(null);
  const [mode, setMode] = useState("dark")

  useEffect(() => {
    fetchVerify().then((user) => {
      if (user) {
        setAuth(user);
      }
    });
  }, []);


  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepPurple,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: {
          fade: grey[500],
        },
      },
    });
  }, [mode]);


  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          mode,
          setMode,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <AppSocket/>
        </QueryClientProvider>

        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

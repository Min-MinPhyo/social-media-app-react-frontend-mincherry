
import {
 Box,
 AppBar,
 Toolbar,
 Typography,
 IconButton,
 Badge,
} from "@mui/material";

import {
 Menu as MenuIcon,
 Add as AddIcon,
 LightMode as LightModeIcon,
 DarkMode as DarkModeIcon,
 ArrowBack as BackIcon,
 Search as SearchIcon,
 Notifications as NotiIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchNotis, fetchUser } from "../libs/fetcher";
import { useApp } from "../ThemedApp";

export default function Header() {
 const { setShowDrawer, showForm, setShowForm, mode, setMode, auth } =
  useApp();
 const { pathname } = useLocation();
 const navigate = useNavigate();


 const { isLoading, isError, data } = useQuery(["notis", auth], fetchNotis);

 function notiCount() {
  if (!auth) return 0;
  if (isLoading || isError) return 0;

  return data.filter(noti => !noti.read).length;
 }

function getUserName(){
    if(auth) {
        return auth.name
     }
}

 return (
  <AppBar position="static">
   <Toolbar>
    {pathname === "/" ? (
     <IconButton
      color="inherit"
      edge="start"
      onClick={() => setShowDrawer(true)}>
      <MenuIcon />
     </IconButton>
    ) : (
     <IconButton
      color="inherit"
      edge="start"
      onClick={() => navigate(-1)}>
      <BackIcon />
     </IconButton>
    )}

    <Typography sx={{ flexGrow:1,fontSize:25,ml: 2 ,color:"green"}}>{auth && getUserName()}</Typography>

    <Box sx={{ display: "flex", gap: 1 }}>
     {auth && (
      <IconButton
       color="inherit"
       onClick={() => setShowForm(!showForm)}>
       <AddIcon />
      </IconButton>
     )}

     <IconButton
      color="inherit"
      onClick={() => navigate("/search")}>
      <SearchIcon />
     </IconButton>

     {auth && (
      <IconButton
       color="inherit"
       onClick={() => navigate("/notis")}>
       <Badge
        color="error"
        badgeContent={notiCount()}>
        <NotiIcon />
       </Badge>
      </IconButton>
     )}

     {mode === "dark" ? (
      <IconButton
       color="inherit"
       edge="end"
       onClick={() => setMode("light")}>
       <LightModeIcon />
      </IconButton>
     ) : (
      <IconButton
       color="inherit"
       edge="end"
       onClick={() => setMode("dark")}>
       <DarkModeIcon />
      </IconButton>
     )}
    </Box>
   </Toolbar>
  </AppBar>
 );
}
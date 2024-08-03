import { Box, Container, Snackbar } from "@mui/material";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";
import { Outlet } from "react-router-dom";
import { useApp } from "./ThemedApp";

export default function Template() {
 const {globalMsg,setGlobalMsg}=useApp()
  return (
    <Box>
      <Header />
      <AppDrawer />

      {/* page tway pya mar */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Outlet />
      </Container>

      {/* page tway pya mar */}

      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={Boolean(globalMsg)}
        autoHideDuration={600}
        onClose={() => setGlobalMsg(null)}
        message={globalMsg}
      />
    </Box>
  );
}

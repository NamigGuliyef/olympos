import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../home/Logo";
import { Button } from "@mui/material";
import { deleteCookie } from "../../helper/setCookie";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
const drawerWidth = 240;

const navLinkStyle = () => {
  return {
    color: "black",
    textDecoration: "none",
    fontSize: "22px",
    width: "100%",
  };
};

export default function AppLayout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteCookie(["token", "role", "name"]);
    window.location.reload();
    dispatch(logout());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            // backgroundColor: "red",
            width: "100%",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Box>
        <Toolbar />
        {/* <Divider /> */}
        <List>
          {[
            { name: "Orders", url: "orders" },
            { name: "Tours", url: "admin-tours" },
            { name: "Hotels", url: "admin-hotels" },
            { name: "Users", url: "admin-users" },
            { name: "Reviews", url: "admin-reviews" },
            { name: "Tour category & hotel specifics", url: "admin-tur-category" },
          ].map((text, index) => (
            <ListItem key={text.name} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                {/* <ListItemText primary={text} /> */}
                <NavLink style={navLinkStyle} to={text.url}>
                  {text.name}
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={handleLogout}>Logout</Button>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 1,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

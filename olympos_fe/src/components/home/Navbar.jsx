import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import { CustomContainer } from "../../theme";
import AuthUser from "../auth/AuthUser";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../services/apiAuth";
import { login, logout } from "../../store/slices/userSlice";
import { deleteCookie, getCookie } from "../../helper/setCookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "./Logo";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../App";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const token = useMemo(() => getCookie("token"), []);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (token) {
      const tokenCheckInterval = setInterval(() => {
        const token = getCookie("token");
        if (!token) {
          setRole(null);
          setAccount(null);
          dispatch(logout());
        }
      }, 10000);
      return () => clearInterval(tokenCheckInterval);
    }
  }, [token, dispatch]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserDetails();
        if (user.statusCode === 403) {
          const obj = { profile_photo: "../../../Logo.jpeg", user: "Admin" };
          setAccount(obj);
        } else {
          setAccount(user);
          dispatch(login(user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [dispatch]);

  useEffect(() => {
    const userRole = getCookie("role");
    setRole(userRole);
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [location]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const navLinkStyle = (isActive) => ({
    color: isHomePage ? "white" : "black",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
  });

  const handleToggleMobile = () => {
    setToggle((curr) => !curr);
  };

  return (
    <Box
      sx={{
        position: isHomePage ? "absolute" : "static",
        top: isHomePage ? "10px" : "null",
        left: isHomePage ? "0" : "null",
        right: isHomePage ? "0" : "null",
        zIndex: 1000,
        borderRadius: "10px",
        boxShadow: isHomePage ? "0" : " 0px 4px 16px 0px #1122110D",
        backgroundColor: isHomePage ? "transparent" : "white",
      }}
    >
      <CustomContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <NavLink to="/turlar" style={navLinkStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FlightIcon />
              <Typography variant="subtitle1">Turlar</Typography>
            </Box>
          </NavLink>
          <NavLink to="/otellər" style={navLinkStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HotelIcon />
              <Typography variant="subtitle1">Otellər</Typography>
            </Box>
          </NavLink>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              p: 3,
            }}
          >
            <IconButton
              sx={{
                ml: 1,
                color: theme.palette.mode === "dark" ? "black" : "#FAAF00",
              }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
        </Box>

        {!isHomePage && <Logo />}

        {isMobile && (
          <div style={{ cursor: "pointer" }} onClick={handleToggleMobile}>
            {toggle ? (
              <CloseIcon
                style={{
                  zIndex: 10,
                  position: "absolute",
                  top: "0.5rem",
                  right: "1rem",
                }}
              />
            ) : (
              <MenuIcon sx={{ color: "black" }} />
            )}
          </div>
        )}

        {isMobile && (
          <Drawer
            anchor="right"
            open={toggle}
            onClose={handleToggleMobile}
            transitionDuration={300}
            sx={{ zIndex: 1000 }}
          >
            <Slide
              direction="left"
              sx={{ width: "45vw", padding: "50px", bgcolor: "" }}
              in={toggle}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5rem",
                }}
              >
                {role !== "admin" && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0.3rem",
                      justifyContent: "center",
                      mb: "3rem",
                    }}
                  >
                    <FavoriteIcon sx={{ color: "red" }} />
                    <NavLink style={navLinkStyle} to="/seçdiklərim">
                      <Typography sx={{ color: "black" }}>Seçilmişlər</Typography>
                    </NavLink>
                  </Box>
                )}
                {role === "null" || !role ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3rem",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: isHomePage ? "white" : "black" }}
                    >
                      <NavLink
                        to="/login"
                        style={{
                          color: "black",
                          textDecoration: "none",
                        }}
                      >
                        Giriş
                      </NavLink>
                    </Typography>

                    <Typography
                      sx={{
                        padding: "1rem 2rem",
                        borderRadius: "10px",
                        backgroundColor: "black",
                        textAlign: "center",
                      }}
                    >
                      <NavLink
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                        to="/signup"
                      >
                        Qeydiyyat
                      </NavLink>
                    </Typography>
                  </Box>
                ) : (
                  <AuthUser user={account} isMobile />
                )}
              </Box>
            </Slide>
          </Drawer>
        )}

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {role !== "admin" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FavoriteIcon sx={{ color: "red" }} />
                <NavLink style={navLinkStyle} to="/seçdiklərim">
                  <Typography>Seçilmişlər</Typography>
                </NavLink>
              </Box>
            )}
            {role === "null" || !role ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography variant="subtitle1" sx={{ color: isHomePage ? "white" : "black" }}>
                  <NavLink
                    to="/login"
                    style={{
                      color: isHomePage ? "white" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Giriş
                  </NavLink>
                </Typography>

                <Typography
                  sx={{
                    padding: "1rem 2rem",
                    borderRadius: "10px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <NavLink
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                    to="/signup"
                  >
                    Qeydiyyat
                  </NavLink>
                </Typography>
              </Box>
            ) : (
              <AuthUser user={account} />
            )}
          </Box>
        )}
      </CustomContainer>
    </Box>
  );
};

export default memo(Navbar);

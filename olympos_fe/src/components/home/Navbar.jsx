import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import { CustomContainer } from "../../theme";
import AuthUser from "../auth/AuthUser";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../services/apiAuth";
import { login, logout } from "../../store/slices/userSlice";
import { deleteCookie, getCookie } from "../../helper/setCookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "./Logo";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const token = useMemo(() => getCookie("token"), []);

  const isHomePage = location.pathname === "/";

  /// detecting token expiration
  useEffect(() => {
    if (token) {
      const tokenCheckInterval = setInterval(() => {
        const token = getCookie("token");
        // Check token expiration
        if (!token || !token.length) {
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
          // deleteCookie(["token", "role"]);
          // navigate("/login");
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

  // location deyisende mobile sheet baglansin
  useEffect(() => {
    setToggle(false);
  }, [location]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  function navLinkStyle(isActive) {
    return {
      color: isHomePage ? "white" : "black",
      textDecoration: "none",
    };
  }

  const handleToggleMobile = () => {
    setToggle((curr) => !curr);
  };
  console.log("role ", role);
  return (
    <Box
      sx={{
        position: isHomePage ? "absolute" : "static",
        top: isHomePage ? "10px" : "null",
        left: isHomePage ? "0" : "null",
        right: isHomePage ? "0" : "null",
        zIndex: 1000,
        // margin: "20px",
        borderRadius: "10px",
        // padding: "10px",
        backgroundColor: isHomePage ? "null" : "white",
        boxShadow: isHomePage ? "0" : " 0px 4px 16px 0px #1122110D",
      }}
    >
      <CustomContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "white",
          }}
        >
          <NavLink to="/turlar" style={navLinkStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <FlightIcon />
              <Typography variant="subtitle1">Turlar</Typography>
            </Box>
          </NavLink>
          <NavLink to="/otellər" style={navLinkStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <HotelIcon />
              <Typography variant="subtitle1">Otellər</Typography>
            </Box>
          </NavLink>
        </Box>
        {/* <Box>Logo</Box> */}

        <Logo />
        {isMobile && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleToggleMobile()}
          >
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
              <MenuIcon />
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
                  // alignItems: "center",
                  gap: "5rem",
                }}
              >
                {role !== "admin" && (
                  <Box
                    sx={{
                      display: "flex",
                      // alignItems: "center",
                      gap: "0.3rem",
                      justifyContent: "center",
                      mb: "3rem",
                    }}
                  >
                    <FavoriteIcon />
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
                        // color: isHomePage ? "black" : "white",

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
                  <span>5</span>
                  // <AuthUser user={account ? account : "admin"} isMobile />
                )}
              </Box>
            </Slide>
          </Drawer>
        )}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {role !== "admin" && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <FavoriteIcon />
                <NavLink style={navLinkStyle} to="/seçdiklərim">
                  <Typography>Favorites</Typography>
                </NavLink>
              </Box>
            )}
            {role === "null" || !role ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: isHomePage ? "white" : "black" }}
                >
                  <NavLink
                    to="/login"
                    style={{
                      color: isHomePage ? "white" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </NavLink>
                </Typography>

                <Typography
                  sx={{
                    padding: "1rem 2rem",
                    borderRadius: "10px",
                    backgroundColor: isHomePage ? "white" : "black",
                    color: isHomePage ? "black" : "white",

                    textAlign: "center",
                  }}
                >
                  <NavLink
                    style={{
                      color: isHomePage ? "black" : "white",
                      textDecoration: "none",
                    }}
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </Typography>
              </Box>
            ) : (
              <AuthUser user={account ? account : "admin"} />
            )}
          </Box>
        )}
      </CustomContainer>
    </Box>
  );
};

export default Navbar;

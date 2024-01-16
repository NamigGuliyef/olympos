import { useEffect, useState } from "react";
import Auth from "../components/auth/Auth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helper/setCookie";

// import Footer from "../components/Footer";
// import Header from "../components/Header";

const Login = () => {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate();
  const token = getCookie("token");
  const role = getCookie("role");

  console.log("token", !!token);

  // useEffect(() => {
  //   if (token !== "null" && role) {
  //     navigate("/");
  //   }
  // });

  return (
    <>
      <Auth isRememberMe={isRememberMe} setIsRememberMe={setIsRememberMe} />
    </>
  );
};

export default Login;

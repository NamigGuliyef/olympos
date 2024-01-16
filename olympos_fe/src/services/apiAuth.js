import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const token = getCookie("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

export const signupHandler = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    const respData = await res.json();

    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

export const loginHandler = async (data) => {
  console.log("loginHandler");
  try {
    const res = await fetch(`${baseUrl}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    const respData = await res.json();

    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

export const getUserDetails = async () => {
  try {
    console.log("running");
    const token = getCookie("token");

    const res = await fetch(`${baseUrl}/user/profile`, {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify({ email }),
    });

    const respData = await res.json();
    console.log("respdata: ", respData);
    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    // return error;
  }
};

export const editUserProfile = async (editProfile) => {
  console.log("editProfile: ", editProfile);
  try {
    const token = getCookie("token");

    const res = await fetch(`${baseUrl}/user/profile/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProfile),
    });
    const data = await res.json();
    console.log("profile data", data);
    return data;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    return error;
  }
};

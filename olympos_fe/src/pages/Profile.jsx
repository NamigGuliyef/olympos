import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Account from "../components/userAccount/Account";
import UserProfile from "../components/reusable/UserProfile";
import { getUserDetails } from "../services/apiAuth";
import { deleteCookie, setCokieHandler } from "../helper/setCookie";
import { useNavigate } from "react-router-dom";
import { CustomContainer } from "../theme";
import { useClientUsers } from "../features/users/useUsers";
import Loader from "../components/reusable/loader";
import EmptyFavorite from "../components/reusable/EmptyFavorite";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isClientUsersLoading, clientUsers } = useClientUsers();

  console.log("isClientUsersLoading", isClientUsersLoading);
  console.log("clientUsers", clientUsers);

  useEffect(() => {
    // getUserData();
    // getUserDetails().then((data) => {
    //   console.log("data", data.first_name);
    //   if (data?.statusCode === 403) {
    //     // deleteCookie(["token", "role", "name"]);
    //     navigate("/admin-panel");
    //   } else {
    //     setUser(data);
    //     setCokieHandler("name", data.first_name);
    //   }
    // });
    getUserDetails().then((data) => {
      if (data.first_name) {
        console.log("data", data.first_name);
        setUser(data);
      }
    });
  }, []);

  if (isClientUsersLoading) {
    return <Loader />;
  }

  return (
    <div>
      <CustomContainer>
        <UserProfile
          tabsData={[
            {
              label: "Profil",
              content: user && <Account user={user} />,
            },
            {
              label: "Sifarişlərim",
              content: (
                // <div>{user?.user_orders.length || "user order is empty"}</div>
                <div>{user?.user_orders.length || <EmptyFavorite />}</div>
              ),
            },
          ]}
        />
      </CustomContainer>
    </div>
  );
};

export default Profile;

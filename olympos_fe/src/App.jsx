import "./App.css";
import { Box, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetails from "./pages/TourDetails";
import NoMatch from "./components/reusable/NoMatch";
import Tours from "./pages/Tours";
import { addDays } from "date-fns";
import FavoriteTours from "./pages/FavoriteTours";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import RecoveryPass from "./pages/RecoveryPass";
import Profile from "./pages/Profile";
import toast, { Toaster } from "react-hot-toast";
import AppLayout from "./components/adminPanel/AppLayout";
import AdminTours from "./pages/AdminTours";
import AdminHotels from "./pages/AdminHotels";
import AdminUsers from "./pages/AdminUsers";
import AdminReviews from "./pages/AdminReviews";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import AdminOrders from "./pages/AdminOrders";
import {
  fetchClientSideToursApi,
  fetchClientSideToursCategory,
  fetchClientTourCategory,
  fetchTourCategory,
} from "./services/apiTours";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Main from "./pages/Main";
import ProtectedAdminPanel from "./components/ProtectedAdminPanel";
import AdminSubscription from "./pages/AdminSubscription";
import AdminCategory from "./pages/AdminCategory";

const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

// BUNU SADƏCƏ TEST ÜÇÜN YAZIRAM XIRDA BİR DƏYİŞİKLİK BELƏ OLSA GİTHUB EXTENTİON BUNU FAYLDA DƏYİŞİKLİK OLMUŞ KİMİ
// QƏBUL EDİR. SAVE EDİRƏM VƏ..
// İNDİ COMMİT EDİB PUSH EDƏCƏM

function App() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [typeOfTours, settypeOfTours] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchClientTourCategory()
      .then((res) => {
        console.log("category", res);
        return res;
      })
      .then((data) => {
        console.log("data");
        if (data.length) {
          settypeOfTours(data);
        }
      });
  }, []);

  if (!typeOfTours?.length) {
    return;
  }

  const queryClient = new QueryClient();

  //   {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 10 * 0,
  //     },
  //   },

  //   queryCache: new QueryCache({
  //     onError: (error) => {
  //       toast(`Something went wrong: ${error.message[0]}`);
  //     },
  //   }),
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Box backgroundColor={theme.palette.primary.body}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              path="/"
              element={<Home months={months} typeOfTours={typeOfTours} />}
            />
            <Route
              path="/turlar"
              element={<Tours months={months} typeOfTours={typeOfTours} />}
            />
            <Route path="/turlar/:tourId" element={<TourDetails />} />
            <Route path="/otellər" element={<Hotels />} />
            <Route path="/otellər/:hotelId" element={<HotelDetails />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/seçdiklərim" element={<FavoriteTours />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyCode" element={<VerifyCode />} />
          <Route path="/recoveryPass" element={<RecoveryPass />} />

          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route element={<AdminOrders />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="admin-tours" element={<AdminTours />} />
            <Route path="admin-hotels" element={<AdminHotels />} />
            <Route path="admin-users" element={<AdminUsers />} />
            <Route path="admin-reviews" element={<AdminReviews />} />
            <Route path="admin-tur-category" element={<AdminCategory />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 1500,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
          }}
        />
      </Box>

    </QueryClientProvider>
  );
}

export default App;

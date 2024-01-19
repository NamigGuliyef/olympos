import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TourListItem from "../components/reusable/TourListItem";
import { CustomContainer, theme } from "../theme";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCookie } from "../helper/setCookie";
import { fetchClientSideToursApi, fetchToursApi } from "../services/apiTours";
import { fetchClientSideHotel } from "../services/apiHotels";
import Loader from "../components/reusable/Loader";
import { Link } from "react-router-dom";
import useTours from "../features/tours/useTours";
import useHotels from "../features/hotels/useHotels";
import EmptyFavorite from "../components/reusable/EmptyFavorite";
import { useWishlistBtn } from "../hooks/useWishlistBtn";

const linkStyle = {
  textDecoration: "none",
  fontSize: "18px",
  fontStyle: "italic",
  backgroundColor: `${theme.palette.primary.main}`,
  color: "white",
  padding: "0.5rem",
  borderRadius: "10px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.3)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
};

const FavoriteTours = () => {
  let favs = useSelector((store) => store.favorite.favorites);
  const user = useSelector((store) => store.user.user);
  const [favorites, setFavorites] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);

  const [allDataTogether, setAllDataTogether] = useState([]);

  const {
    wishlist,
    isWishlistLoading,
    isError,
    error: wishlistError,
  } = useUserWishlist();
  const { isToursLoading, tours } = useTours("user");
  const { isHotelsLoading, hotels, error: hotelError } = useHotels("user");

  // useEffect(() => {
  //   const fetchData = async () => {
  //
  //     try {
  //       const [tours, hotels] = await Promise.all([
  //         fetchClientSideToursApi(),
  //         fetchClientSideHotel(),
  //       ]);

  //       setAllDataTogether((prev) => [...prev, ...tours, ...hotels]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [wishlist]);
  useEffect(() => {
    if (!isToursLoading && !isHotelsLoading) {
      setAllDataTogether((prev) => [...prev, ...tours, ...hotels]);
    }
  }, [hotels, isHotelsLoading, tours, isToursLoading]);

  useEffect(() => {
    if (user.length && token && role === "user") {
      if (isWishlistLoading) {
        return;
      }

      if (
        setAllDataTogether?.length &&
        !isWishlistLoading &&
        Array.isArray(wishlist)
      ) {
        const arr = allDataTogether?.filter((obj1) => {
          return wishlist?.some(
            (obj2) =>
              obj2?.[obj2.hotelId ? "hotelId" : "tourId"]?._id === obj1._id
          );
        });

        setFavorites(arr);
      }
    } else {
      setFavorites(favs);
    }
  }, [token, role, user, favs, wishlist, isWishlistLoading, allDataTogether]);

  if (isWishlistLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{wishlistError.message}</div>;
  }

  return (
    <Box>
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {wishlist && favorites.length ? (
            favorites?.map((item) => (
              <TourListItem
                isFavorite={true}
                favorite
                key={item._id}
                item={item}
                compareData={tours}
              />
            ))
          ) : (
            <EmptyFavorite />
          )}
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default FavoriteTours;

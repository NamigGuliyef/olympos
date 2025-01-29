import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Typography, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../components/reusable/Loader";
import ErrorMessage from "../components/reusable/ErrorMessage";
import FavoriteBtn from "../components/reusable/FavoriteBtn";
import ReusableButton from "../components/reusable/ReusableButton";
import UserReviews from "../components/reusable/UserReviews";
import LightBoxGallery from "../components/LightBoxGallery";
import AdminModal from "../components/reusable/AdminModal";
import AddReviews from "../components/reusable/AddReviews";

import { CustomContainer, FlexBetween, IframeWrapper, RatingComponent, SectionTitle, theme } from "../theme";
import { baseUrl } from "./Tours";
import { useSingleHotel } from "../features/hotels/useHotels";
import { useWishlistBtn } from "../hooks/useWishlistBtn";
import { createHotelOrderApi } from "../services/apiOrders";
import { getCookie } from "../helper/setCookie";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import getUserAverageRating from "../helper/getUserAverageRating";

const HotelDetailTest = () => {
  const [openBronModal, setOpenBronModal] = useState(false);
  const [bronCounter, setBronCounter] = useState(1);
  const [crudEventHappened, setCrudEventHappened] = useState(false);

  const { isWishlistLoading } = useUserWishlist();
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);
  const navigate = useNavigate();
  const { hotelId } = useParams();
  
  const { singleHotelLoading, singleHotel, error } = useSingleHotel(`${baseUrl}/hotels/single/${hotelId}`);
  const { isInFavorite, handleFavoriteClick } = useWishlistBtn(singleHotel, hotelId, "hotel");

  const userInUserSlice = useSelector((state) => state.user.user);

  useEffect(() => {}, [crudEventHappened]);

  if (singleHotelLoading || isWishlistLoading) return <Loader />;
  if (error) return <ErrorMessage />;

  const handleOpenBronModal = () => {
    userInUserSlice?.[0]?.first_name ? setOpenBronModal(true) : navigate("/login");
  };

  const handleOrder = () => {
    createHotelOrderApi({ hotelId, confirmed_person_count: bronCounter }).then((res) => {
      res.message === "Your selection has been reserved" ? toast.success(res.message) : toast.error(res.message);
      setOpenBronModal(false);
      setBronCounter(1);
    });
  };

  return (
    <CustomContainer>
      {/* Breadcrumb */}
      <Stack direction="row" spacing={1} alignItems="center">
        <NavLink to="/" style={{ textDecoration: "none", color: theme.palette.primary.pink }}>
          Ana səhifə <ChevronRightIcon />
        </NavLink>
        <NavLink to="/turlar" style={{ textDecoration: "none", color: theme.palette.primary.pink }}>
          Otellər <ChevronRightIcon />
        </NavLink>
        <Typography>{singleHotel?.name}</Typography>
      </Stack>

      {/* Title and Price */}
      <FlexBetween sx={{ my: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontSize: { xs: "16px", sm: "20px", md: "24px" }, fontWeight: 700 }}>
            {singleHotel.name}
          </Typography>
          <RatingComponent>{getUserAverageRating(singleHotel?.reviews)}</RatingComponent>
        </Stack>
        <Stack spacing={1} alignItems="flex-end">
          <Typography variant="h4" sx={{ color: theme.palette.primary.pink, fontWeight: 700 }}>
            ₼ {singleHotel.price}
          </Typography>
          <Stack direction="row" spacing={2}>
            <FavoriteBtn id={singleHotel?._id} onClick={handleFavoriteClick} favoriteClicked={isInFavorite} />
            <ReusableButton disabled={role === "admin"} onClick={handleOpenBronModal} bgColor={theme.palette.primary.main}>
              Bron et
            </ReusableButton>
          </Stack>
        </Stack>
      </FlexBetween>

      {/* Image Gallery */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <LightBoxGallery photos={singleHotel?.photos} />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {singleHotel?.pictureURL?.slice(1, 5)?.map((item) => (
            <img key={item} src={item} alt="hotel" style={{ width: "316px", height: "271px", borderRadius: "8px" }} />
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Hotel Information */}
      <SectionTitle>Məlumat</SectionTitle>
      <IframeWrapper dangerouslySetInnerHTML={{ __html: singleHotel?.description }} />

      {/* User Reviews */}
      <UserReviews setCrudEventHappened={setCrudEventHappened} singleHotel={singleHotel} reviews={singleHotel.reviews} />
      {token && role === "user" && <AddReviews setCrudEventHappened={setCrudEventHappened} type="hotel" id={singleHotel._id} editOrCreate="create" />}
      
      {/* Hotel Map */}
      <IframeWrapper dangerouslySetInnerHTML={{ __html: singleHotel?.map }} />

      {/* Booking Modal */}
      {openBronModal && (
        <AdminModal openOrClose={openBronModal} setShowInput={setOpenBronModal}>
          <Typography sx={{ textAlign: "center", color: "red", fontSize: "20px" }}>{singleHotel?.name}</Typography>
          <ReusableButton onClick={handleOrder} bgColor={theme.palette.primary.main}>Rezerv et</ReusableButton>
        </AdminModal>
      )}
    </CustomContainer>
  );
};

export default HotelDetailTest;

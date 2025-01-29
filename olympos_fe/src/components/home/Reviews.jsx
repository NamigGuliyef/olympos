import { useTheme } from "@emotion/react";
import { Star } from "@mui/icons-material";
import { CardContent, CardMedia, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import useHomeReviews from "../../features/home/useHomeReviews";
import { CustomContainer } from "../../theme";
import Loader from "../reusable/Loader";

export default function Reviews() {
  const { isReviewLoading, homeReviews } = useHomeReviews();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const tablet = useMediaQuery("(max-width: 900px)");
  const modeTheme = useTheme();
  if (isReviewLoading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <CssBaseline />
      <Swiper
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={tablet ? 2 : 5}
        navigation
        pagination={{ clickable: true }}
      >
        {homeReviews?.map((box) => (
          <SwiperSlide key={uuidv4()}>
            <Box
              sx={{
                maxWidth: "320px",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "white",
                margin: "0 auto",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "black" }}>
                  {box?.title}
                </Typography>
                <ReviewSubtitle>{box?.description.slice(0, 50)}</ReviewSubtitle>
                <Box sx={{ display: "flex", gap: "0.3rem", marginTop: "0.5rem" }}>
                  {Array.from({ length: box?.rating }).map(() => (
                    <Star key={uuidv4()} sx={{ color: "#FFC107", fontSize: "18px" }} />
                  ))}
                </Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <Typography variant="subtitle2" sx={{ color: "black" }}>
                    {box?.userId?.first_name + " " + box?.userId.last_name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "black" }}>
                    {box.job}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <Typography variant="subtitle2" sx={{ color: "black" }}>
                    {box?.hotelId ? box?.hotelId?.name : box?.tourId?.name}
                  </Typography>
                </Box>
              </CardContent>
              <CardMedia
                sx={{ height: 150, borderRadius: "8px" }}
                image={box.hotelId ? box?.hotelId.photos[0] : box.tourId?.photo}
                title="Review Image"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomContainer>
  );
}

function ReviewSubtitle({ children }) {
  const [viewMore, setViewMore] = useState(true);

  return (
    <Box>
      <Typography
        sx={{ fontSize: "12px", fontWeight: "500", textAlign: "left", marginTop: "1rem", color: "#111" }}
        variant="body2"
      >
        {viewMore ? children.split(" ").slice(0, 50).join(" ") : children}
      </Typography>
    </Box>
  );
}

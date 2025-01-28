import { useTheme } from "@emotion/react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia, Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Link } from "react-router-dom";
import { getStarRating } from "../../components/reusable/getStarRating";
import getUserAverageRating from "../../helper/getUserAverageRating";
import { useWishlistBtn } from "../../hooks/useWishlistBtn";
import FavoriteBtn from "./FavoriteBtn";

const TourListItem = ({ item, favorite, isFavorite, compareData }) => {
  const { isInFavorite, handleFavoriteClick } = useWishlistBtn(
    item,
    item?._id,
    item?.photos ? "hotel" : "tour"
  );

  const ratingData = compareData?.find((el) => el._id === item?._id);
  const imageUrl =
    favorite
      ? item?.hotelId?.photos?.[0] || item?.photos?.[0] || item?.tourId?.photo || item?.photo
      : item?.photos?.[0] || item?.photo;

  const isTablet = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const path = isFavorite
    ? item?.photos
      ? `/otellər/${item?._id}`
      : `/turlar/${item?._id}`
    : `${item?._id}`;

  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: { xs: "300px", sm: "565px", md: "800px" },
          height: { xs: "460px", sm: "280px" },
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          borderRadius: "20px",
          mb: "1.5rem",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          background: `linear-gradient(145deg, #ffffff, #e6e6e6)`,
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "40%" },
            height: isTablet ? "200px" : "100%",
            objectFit: "cover",
            borderRadius: "20px 0 0 20px",
          }}
          image={imageUrl}
          alt={item?.name || "Item image"}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            p: "1rem",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", position: "relative", height: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                textTransform: "capitalize",
                fontSize: { xs: "16px", sm: "20px" },
                mb: 1,
              }}
            >
              {item?.name?.toLowerCase() ||
                item?.hotelId?.name?.toLowerCase() ||
                item?.tourId?.name?.toLowerCase()}
            </Typography>



            {/* Star rating */}
            {item?.tour_day && (
              <Box sx={{ mb: 1 }}>
                {getStarRating(getUserAverageRating(ratingData?.reviews))}
              </Box>
            )}

            {/* Days */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.secondary.main,
                fontSize: { xs: "18px", sm: "20px" },
                mt: 1,
              }}
            >
              {item?.tour_day ? `${item?.tour_day} gün` : null}
            </Typography>

            {/* Price */}
            <Box
              sx={{
                position: "absolute",
                top: 33,
                right: 5,
                fontWeight: 700,
                color: theme.palette.success.main,
                fontSize: { xs: "22px", sm: "26px" },
                zIndex: 10,
              }}
            >
              {item?.price ? `${item.price} ₼` : "Məlumat mövcud deyil"}
            </Box>

            {/* Dates */}
            {item?.photos && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mr: 1,
                  }}
                >
                  Tarix:
                </Typography>
                <Typography variant="body2"  sx={{ color: theme.palette.primary.main }}>
                  {item?.start_date?.slice(0, 10) + " /" || "Təyin edilməyib"} {" "}
                  {item?.end_date?.slice(0, 10) || "Təyin edilməyib"}
                </Typography>
              </Box>
            )}


            {/* Tour date */}
            {item?.tour_date && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mt: 1,
                }}
              >
                Tur tarixi: {item?.tour_date.slice(0, 10) || "Təyin edilməyib"}
              </Typography>
            )}

            {/* Reviews */}
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, mt: 0.5 }}
              color="textSecondary"
            >
              Rəylər: {item?.reviews ? `${item.reviews.length} rəy` : "Heç bir rəy yoxdur"}
            </Typography>


            {/* Location */}
            {item?.location && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  mt: 2, // Yuxarıdan məsafə əlavə edir
                }}
              >
                <FmdGoodIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.primary.main,
                    mr: 0.5,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {item?.location?.substring(0, 50)}
                </Typography>
              </Box>
            )}

          </CardContent>

          <Stack direction="row" spacing={2} alignItems="center">
            <FavoriteBtn
              onClick={(e) => handleFavoriteClick(e)}
              favoriteClicked={isInFavorite}
              id={item?._id}
            />
            <Button
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: 600,
                textTransform: "capitalize",
                px: 3,
                py: 1,
                borderRadius: "8px",
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              Ətraflı
            </Button>
          </Stack>
        </Box>
      </Card>
    </Link>
  );
};

export default TourListItem;

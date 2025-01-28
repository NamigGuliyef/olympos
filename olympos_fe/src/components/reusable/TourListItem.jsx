import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FavoriteBtn from "./FavoriteBtn";
import { useTheme } from "@emotion/react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const TourListItem = ({ item, isFavorite, compareData }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 600px)");

  const type = item?.photos ? "hotel" : "tour";
  const imageUrl =
    item?.photos?.[0] || item?.photo || item?.hotelId?.photos?.[0] || "";
  const path = isFavorite
    ? type === "tour"
      ? `/turlar/${item?._id}`
      : `/otellər/${item?._id}`
    : `${item?._id}`;

  return (
    <Link style={{ textDecoration: "none" }} to={path}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            background: "linear-gradient(135deg, #ffffff, #f8f9fd)",
            mb: "1.5rem",
            position: "relative",
            "&:hover": {
              transform: "translateY(-8px)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: isTablet ? "100%" : "250px",
              height: "auto",
              objectFit: "cover",
            }}
            image={imageUrl}
            alt={item?.name || "Tour Image"}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              flex: 1,
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 1,
                  letterSpacing: "0.5px",
                  textTransform: "capitalize",
                }}
              >
                {item?.name || item?.hotelId?.name || item?.tourId?.name}
              </Typography>

              {item?.location && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FmdGoodIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "20px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#6b7280",
                      fontWeight: 500,
                    }}
                  >
                    {item.location}
                  </Typography>
                </Box>
              )}

              <Stack spacing={1} sx={{ mt: 2 }}>
                {item?.tour_day && (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6b7280",
                    }}
                  >
                    Tur müddəti: {item.tour_day} gün
                  </Typography>
                )}

                {item?.tour_date && (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6b7280",
                    }}
                  >
                    Tarix: {item.tour_date.slice(0, 10)}
                  </Typography>
                )}

                {item?.price && (
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Qiymət: {item.price} AZN
                  </Typography>
                )}
              </Stack>
            </CardContent>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FavoriteBtn id={item?._id} />
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    textTransform: "capitalize",
                    px: 4,
                    py: 1,
                    borderRadius: "30px",
                    fontSize: "14px",
                    fontWeight: 600,
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Ətraflı
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </Card>
      </motion.div>
    </Link>
  );
};

export default TourListItem;

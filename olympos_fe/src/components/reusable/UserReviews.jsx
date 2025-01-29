import FlagIcon from "@mui/icons-material/Flag";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AdminModal from "../../components/reusable/AdminModal";
import { getStarRating } from "../../components/reusable/getStarRating";
import { getDataByRange } from "../../helper/getDataByRange";
import getUserAverageRating from "../../helper/getUserAverageRating";
import { getCookie } from "../../helper/setCookie";
import { deleteUserReview } from "../../services/apiUsers";
import { FlexBetween, SectionTitle } from "../../theme";
import AddReviews from "./AddReviews";
import ReviewPagination from "./ReviewPagination";

const perPage = 3;

const UserReviews = ({ reviews, setCrudEventHappened }) => {
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVal, setEditVal] = useState(null);

  const btnCount = useMemo(() => Math.ceil(reviews?.length / perPage), [reviews]);
  const averageReview = useMemo(() => getUserAverageRating(reviews)?.toFixed(1), [reviews]);

  if (!reviews?.length) return null;

  const handleOpenReviewEdit = (review) => {
    setEditVal(review);
    setModalOpen(true);
  };

  const handleDeleteReview = (id) => {
    deleteUserReview(id).then(() => navigate(0));
  };

  const data = getDataByRange(reviews, (page - 1) * perPage, page * perPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
      <SectionTitle>Rəylər</SectionTitle>
      <Typography variant="h2" fontWeight={700}>{averageReview}</Typography>
      <Divider />
      {data.map((review, i) => (
        <Box key={review._id || i} sx={{ position: "relative", py: 2 }}>
          <FlagIcon sx={{ position: "absolute", right: 0, top: 10 }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
            <Avatar src={review.userId?.profile_photo} alt={review.userId?.first_name} />
            <Stack direction="column">
              <FlexBetween>
                <Stack direction="row" spacing={2}>
                  <Typography>
                    {/* {[...Array(review.rating)].map((_, index) => (
                          <StarRateIcon
                            key={index}
                            sx={{ color: `${theme.palette.primary.gold}` }}
                          />
                        ))} */}
                    {getStarRating(review.rating)}
                  </Typography>
                  {"   | "}
                  <Typography>
                    {review?.userId?.first_name +
                      " " +
                      review?.userId?.last_name}
                  </Typography>
                </Stack>
              </FlexBetween>
              <Typography>{review?.description}</Typography>
            </Stack>
            {role === "user" && user[0]?._id === review?.userId?._id && (
              <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
                <Button onClick={() => handleOpenReviewEdit(review)}>Düzəliş et</Button>
                <Button onClick={() => handleDeleteReview(review._id)}>Sil</Button>
              </Stack>
            )}
          </Box>
          <Divider />
        </Box>
      ))}
      <ReviewPagination page={page} setPage={setPage} btnCount={btnCount} />
      {modalOpen && (
        <AdminModal openOrClose={modalOpen} setShowInput={setModalOpen}>
          <AddReviews
            setCrudEventHappened={setCrudEventHappened}
            type="hotel"
            editOrCreate="edit"
            id={editVal?._id}
            staleEditVal={editVal}
          />
        </AdminModal>
      )}
    </Box>
  );
};

export default UserReviews;

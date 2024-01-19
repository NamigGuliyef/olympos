import { Box, Button } from "@mui/material";
import useHotels from "../features/hotels/useHotels";
import useDeleteHotel from "../features/hotels/useDeleteHotel";
import ReusableTable from "../components/adminPanel/ReusableTable";
import { useEffect, useState } from "react";
import EachTourTableRow from "../components/adminPanel/EachTourTableRow";
import Loader from "../components/reusable/Loader";
import AdminModal from "../components/reusable/AdminModal";
import Inputs from "../components/adminPanel/Inputs";
import { useCreateHotel } from "../features/hotels/useCreateHotel";
import { useEditHotel } from "../features/hotels/useEditHotel";
import DataTable from "../components/adminPanel/DataTable";
import { fetchHotelIncludings } from "../services/apiHotels";
import useReviews from "../features/reviews/useReviews";
import useDeleteReview from "../features/reviews/useDeleteReview";

const AdminReviews = () => {
  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Username", width: 180 },
    {
      field: "hotelId",
      headerName: "Tour or Hotel",
      width: 180,
      renderCell: ({ row }) => {
        return <span>{row?.tourOrHotelName}</span>;
      },
    },
    // { field: "tour", headerName: "tour", width: 300 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "rating", headerName: "Rating", width: 100 },

    {
      field: "DeleteButton",
      sortable: false,
      align: "center",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return <Button onClick={() => deleteReview(id)}>Delete</Button>;
      },
    },
  ];

  const { isReviewsLoading, reviews } = useReviews();
  const { deleteReview, reviewDeleteLoading } = useDeleteReview();

  if (isReviewsLoading) return <Loader />;
  if (!reviews.length) {
    return <Box>No reviews yet</Box>;
  }

  return (
    <Box>
      <DataTable rows={reviews} columns={columns} />
    </Box>
  );
};

export default AdminReviews;

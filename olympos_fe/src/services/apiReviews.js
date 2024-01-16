import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";

const token = getCookie("token");
export async function fetchReviewsApi() {
  const token = getCookie("token");

  const res = await fetch("http://localhost:7070/admin/reviews", {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  console.log("review", data);
  const response = data?.map(
    ({
      title,
      description,
      rating,
      _id,
      userId: { first_name, last_name },
      hotelId,
      tourId,
    }) => {
      return {
        title,
        description,
        _id,
        rating,
        name: first_name + " " + last_name,
        tourOrHotelName: hotelId ? hotelId.name : tourId.name,
      };
    }
  );
  console.log("response", response);

  return response;
}

export const deleteReviewApi = (id) => {
  const token = getCookie("token");

  fetch(`http://localhost:7070/admin/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
      return err;
    });
};

export const createReviewApi = (newReview) => {
  const token = getCookie("token");

  console.log("newReview", newReview);
  fetch(`http://localhost:7070/admin/hotel/create`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: newReview,
  })
    .then((res) => res.json())
    .then((data) => console.log("gelen", data))
    .catch((err) => {
      console.log("rev err", err);
      return err;
    });
};

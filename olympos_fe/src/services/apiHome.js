import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";

const token = getCookie("token");
export async function fetchHomeReview() {
  const res = await fetch("http://localhost:7070/reviews", {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  console.log("home reviews", data);
  return data;
}

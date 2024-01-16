import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";

export async function fetchOrdersApi() {
  const token = getCookie("token");
  if (token && token.length > 1) {
    const res = await fetch("http://localhost:7070/admin/orders", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    return data;
  }
}

export const deleteOrderApi = (id) => {
  const token = getCookie("token");
  fetch(`http://localhost:7070/admin/orders/confirmation/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createTourOrderApi = async (newOrder) => {
  const token = getCookie("token");
  try {
    const res = await fetch(`http://localhost:7070/user/tour/create-reserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(newOrder),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const createHotelOrderApi = async (newOrder) => {
  const token = getCookie("token");
  try {
    const res = await fetch(`http://localhost:7070/user/hotel/create-reserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(newOrder),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const submitOrder = (data) => {
  const token = getCookie("token");
  console.log("data", data);
  fetch(`http://localhost:7070/admin/orders/confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const editUserOrder = (data, id) => {
  const token = getCookie("token");
  fetch(`http://localhost:7070/admin/orders/confirmation/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.message);
      return err;
    });
};

export const editOrderApi = async (editOrder, id) => {
  const token = getCookie("token");
  try {
    console.log("edirorder ise dusdu");
    const data = await fetch(
      `http://localhost:7070/admin/orders/confirmation/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editOrder),
      }
    );
    const res = await data.json();
    if (res.statusCode === 400) {
      throw new Error(res.message);
    }
    console.log("res", res);
    return res;
  } catch (error) {
    console.log("edit order erroru", error);
    return error;
  }
};

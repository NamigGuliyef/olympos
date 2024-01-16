import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";

export async function fetchToursApi() {
  const token = getCookie("token");
  const res = await fetch("http://localhost:7070/admin/tour", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();
  data = data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
  return data;
}

export async function fetchClientSideToursApi() {
  const res = await fetch("http://localhost:7070/tour");
  let data = await res.json();
  return data;
}

export async function fetchClientSingleTour(id) {
  const res = await fetch(`http://localhost:7070/tour/${id}`);
  let data = await res.json();
  return data;
}

export const fetchTourFilter = async (url) => {
  console.log("url: " + url);
  const res = await fetch(`http://localhost:7070/tours/filter${url}`);
  let data = await res.json();

  console.log("flter", data);

  return data;
};

export async function fetchClientSideToursCategory() {
  const res = await fetch("http://localhost:7070/tourcategory");
  let data = await res.json();
  return data;
}

// export const clientSideTourOrder = async (newOrder) => {
//   try {
//     const res = await fetch(`http://localhost:7070/user/tour/create-reserv`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: "Bearer " + token,
//       },

//       body: JSON.stringify(newOrder),
//     });

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

export const deleteTourApi = (id) => {
  const token = getCookie("token");
  fetch(`http://localhost:7070/admin/tour/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
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

export const createTourApi = (newTour) => {
  const token = getCookie("token");
  console.log("new TourApi", newTour);
  fetch(`http://localhost:7070/admin/tour/create`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: newTour,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data api", data);
      if (data?.statusCode && data?.statusCode?.toString().startsWith("4")) {
        throw new Error(`Couldn't create: ${data.message} `);
      } else {
        toast.success("Yeni  tur yaradıldı");
      }
    })
    .catch((err) => {
      console.log("api erroru", err);
      toast.error(err.message);
      return err;
    });
};

export const editTourApi = (editTour, id) => {
  const token = getCookie("token");
  fetch(`http://localhost:7070/admin/tour/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: editTour,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export async function fetchTourCategory() {
  const token = getCookie("token");
  const res = await fetch("http://localhost:7070/admin/tourcategory", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();
  // data = data.map(({ name }) => name);
  return data;
}

export async function fetchClientTourCategory() {
  const res = await fetch("http://localhost:7070/tourcategory", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let data = await res.json();
  // data = data.map(({ name }) => name);
  return data.map(({ name }) => name);
}

export const createTourCategory = (newTour) => {
  const token = getCookie("token");
  console.log("new TourApi", newTour);
  fetch(`http://localhost:7070/admin/tourcategory/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify(newTour),
  })
    .then((res) => {
      console.log("res", res);
      if (res.ok) {
        console.log("kateqoriya data", res);
        toast.success("Yeni  tur kateqoriyası yaradıldı");
        window.location.reload();
      }
      return res;
    })
    .catch((err) => {
      console.log("api erroru", err);
      toast.error(err.message);
      return err;
    });
};

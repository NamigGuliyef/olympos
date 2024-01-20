import { Box, Button, Typography } from "@mui/material";
import React from "react";
import DataTable from "../adminPanel/DataTable";
import { deleteUserOrder } from "../../services/apiOrders";
import { useNavigate } from "react-router-dom";

const UserOrders = ({ orders }) => {
  console.log("userOrders", orders);
  const navigate = useNavigate();
  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },

    // { field: "name", headerName: "Name", width: 130 },

    {
      field: "name",
      headerName: "Sifariş",
      sortable: false,

      width: 300,
      renderCell: ({ row }) => {
        return (
          <span>{row?.tourId ? row?.tourId.name : row?.hotelId.name}</span>
        );
      },
    },
    {
      field: "confirmed_person_count",
      headerName: "Sifariş sayı",
      sortable: false,

      width: 300,
      renderCell: ({ row }) => {
        return <span>{row?.confirmed_person_count}</span>;
      },
    },
    {
      field: "ordered",
      headerName: "Status",
      sortable: false,

      width: 300,
      renderCell: ({ row }) => {
        return (
          <div>
            {row?.ordered ? (
              <span style={{ color: "green" }}>Təsdiqlənib</span>
            ) : (
              <span style={{ color: "red" }}>Gözləmədə</span>
            )}
          </div>
        );
      },
    },

    {
      field: "Ləğv",
      sortable: false,

      width: 300,
      renderCell: ({ row }) => {
        console.log("row", row);
        if (!row.ordered) {
          return (
            <Button
              style={{
                width: "100px",
                height: "2rem",
                border: "none",
                outline: "none",
                hover: "scale(1.05)",
                backgroundColor: "red",
                color: "white",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleUserOrderDelete(
                  row?.tourId ? row.tourId._id : row.hotelId._id
                )
              }
            >
              Sil
            </Button>
          );
        } else {
          return <span></span>;
        }
      },
    },
  ];
  console.log("orders", orders);

  function handleUserOrderDelete(id) {
    console.log("silinen id", id);
    deleteUserOrder(id);
    navigate(0);
  }

  return (
    <div>
      <DataTable rows={orders?.user_orders} columns={columns} />{" "}
    </div>
  );
};

export default UserOrders;

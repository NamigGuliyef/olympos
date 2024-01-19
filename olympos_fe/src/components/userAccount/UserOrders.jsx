import { Box, Typography } from "@mui/material";
import React from "react";

const UserOrders = ({ orders }) => {
  console.log("userOrders", orders);
  // const columns = [
  //   // { field: "_id", headerName: "ID", width: 70 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 110,
  //     renderCell: ({ row }) => {
  //       return <img src={row.photos[0]} />;
  //     },
  //   },
  //   { field: "country", headerName: "Country", width: 130 },
  //   { field: "name", headerName: "Name", width: 130 },
  //   { field: "city", headerName: "City", width: 130 },
  //   {
  //     field: "location",
  //     headerName: "Location",
  //     // type: "number",
  //     width: 270,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     type: "number",
  //     width: 90,
  //   },

  //   {
  //     field: "description",
  //     headerName: "Description",
  //     width: 90,
  //   },
  //   // {
  //   //   field: "map",
  //   //   headerName: "Map",
  //   //   width: 70,
  //   // },

  //   {
  //     field: "start_date",
  //     headerName: "Start Date",
  //     width: 110,
  //   },
  //   {
  //     field: "end_date",
  //     headerName: "End Date",
  //     width: 110,
  //   },
  //   {
  //     field: "DeleteButton",
  //     sortable: false,
  //     align: "center",
  //     width: 100,
  //     renderCell: ({ row: { id } }) => {
  //       return <Button onClick={() => deleteHotel(id)}>Delete</Button>;
  //     },
  //   },
  //   {
  //     field: "EditButton",
  //     sortable: false,
  //     align: "center",
  //     width: 100,
  //     renderCell: ({ row }) => {
  //       return <Button onClick={() => handleOpenModal(row)}>Edit</Button>;
  //     },
  //   },
  // ];
  console.log("orders", orders);
  return <div>{/* <DataTable rows={orders} columns={columns} /> */}</div>;
};

export default UserOrders;

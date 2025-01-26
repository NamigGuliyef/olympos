import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CustomContainer } from "../../theme";
import SectionHeader from "../reusable/SectionHeader";

const SelectFromHome = ({ data, title, link }) => {
  const theme = useTheme();

  return (
    <CustomContainer
      sx={{
        padding:
          title === "Turlar"
            ? "12rem 0rem 0 1rem !important"
            : "5rem 0rem 0 1rem !important",
      }}
    >
      <SectionHeader secTitle={title} link={link} btn={"Daha çox"} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {data?.map((item, i) => (
          <Link
            style={{
              textDecoration: "none",
              color: "#112211",
            }}
            key={i}
            to={
              title === "Turlar"
                ? "turlar/" + `${item._id}`
                : "otellər/" + `${item._id}`
            }
          >
            <Box
              sx={{
                width: 320,
                height: 200,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                borderRadius: "20px",
                padding: "16px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: theme.palette.mode === "dark"
                  ? "linear-gradient(145deg, #1e1e1e, #292929)"
                  : "linear-gradient(145deg, #ffffff, #f0f0f0)",
                transition: "transform 0.5s ease, box-shadow 0.5s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(-2deg)",
                  boxShadow: "0px 12px 36px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "20px",
                  zIndex: 1,
                }}
              />
              <img
                width={90}
                height={90}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  zIndex: 2,
                  alignSelf: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                src={item.photo || item.photos[0]}
              />
              <Box
                sx={{
                  zIndex: 2,
                  textAlign: "center",
                  marginTop: "16px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "22px",
                    letterSpacing: "0em",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#222222",
                  }}
                  variant="h5"
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    color: theme.palette.mode === "dark" ? "#aaa" : "#444",
                    marginTop: "8px",
                  }}
                >
                  Qiymət: {item.price} AZN
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </CustomContainer>
  );
};

export default SelectFromHome;

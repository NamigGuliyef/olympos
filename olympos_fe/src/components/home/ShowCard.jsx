import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CustomContainer, theme } from "../../theme";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const data = [
  {
    id: 77,
    img: "/assets/flight.png",
    subtitle:
      "Turlarımızla dünyanın gözəlliklərinə yaxından baxın! Ailənizlə xoş anlar yaşamaq üçün ən yaxşı turlar bizimlədir! Təbiət qoynunda dinc anlar üçün indicə rezervasiya edin!",
    btnAction: "Turlara bax",
    title: "Turlar",
    styleSide: "left",
    url: "/turlar",
  },
  {
    id: 99,
    img: "/assets/hotel.png",
    subtitle:
      "Otellərimizdə rahatlıq sizin üçün nəzərdə tutulub. Evdən uzaqda, ev rahatlığında: Sizin üçün özəl olanı bizimlə tapın! Unudulmaz anlar üçün rezervasiya edin. Biz buradayıq, sizi gözləyirik!",
    btnAction: "Otellərə bax",
    title: "Otellər",
    styleSide: "right",
    url: "/otellər",
  },
];

const ShowCard = () => {
  const cardRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [componentPosition, setComponentPosition] = useState(0);

  useEffect(() => {
    setComponentPosition(cardRef.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Grid
      ref={cardRef}
      container
      sx={{
        padding: "3rem 0 2rem 0",
        justifyContent: "center",
        gap: "1.5rem",
      }}
      spacing={4}
      columns={16}
    >
      {data.map((card) => (
        <Grid
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          key={card.id}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              position: "relative",
              width: {
                xs: "280px",
                sm: "500px",
              },
              textAlign: "center",
              height: "450px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              '&:hover': {
                transform: "scale(1.05)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardMedia
              sx={{ position: "absolute", inset: 0, filter: "brightness(70%)" }}
              component="img"
              image={card.img}
              height="450px"
              alt="card image"
            />

            <CardContent
              sx={{
                zIndex: 1,
                position: "absolute",
                bottom: 0,
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
              }}
            >
              <Typography
                color="white"
                variant="h5"
                gutterBottom
                fontWeight="bold"
                sx={{
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                color="white"
                variant="body2"
                gutterBottom
                sx={{ fontSize: "0.9rem", lineHeight: "1.4" }}
              >
                {card.subtitle}
              </Typography>
              <CardActions
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={card.url}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      sx={{
                        width: 140,
                        height: 45,
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        borderRadius: "10px",
                        textTransform: "none",
                        transition: "background-color 0.3s ease, transform 0.3s ease",
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      {card.btnAction}
                    </Button>
                  </Link>
                </motion.div>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowCard;

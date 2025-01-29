import { useTheme } from "@emotion/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Grid,
  IconButton, Typography,
  useMediaQuery
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import SendEmailFromClient from "./SendEmailFromClient";

// const destinations = [
//   { name: "Quba", url: "https://az.wikipedia.org/wiki/Quba" },
//   { name: "Qusar", url: "https://az.wikipedia.org/wiki/Qusar" },
//   { name: "Şahdağ", url: "https://az.wikipedia.org/wiki/%C5%9Eahda%C4%9F_(zirv%C9%99)" },
//   { name: "Balakən", url: "https://az.wikipedia.org/wiki/Balak%C9%99n_rayonu" },
//   { name: "Zaqatala", url: "https://az.wikipedia.org/wiki/Zaqatala_rayonu" },
//   { name: "Qax", url: "https://az.wikipedia.org/wiki/Qax" },
//   { name: "Şəki", url: "https://az.wikipedia.org/wiki/%C5%9E%C9%99ki" },
//   { name: "Qəbələ", url: "https://az.wikipedia.org/wiki/Q%C9%99b%C9%99l%C9%99" },
//   { name: "Lənkəran", url: "https://az.wikipedia.org/wiki/L%C9%99nk%C9%99ran" },
//   { name: "Lerik", url: "https://az.wikipedia.org/wiki/Lerik_rayonu" },
//   { name: "Astara", url: "https://az.wikipedia.org/wiki/Astara_rayonu" },
//   { name: "Tufandağ", url: "https://az.wikipedia.org/wiki/Tufanda%C4%9F" },
// ];

const Footer = () => {
  const isMedium = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 500px)");
  const modeTheme = useTheme();
  const isDarkMode = modeTheme.palette.mode === "dark";

  return (
    <Box
      background="linear-gradient(135deg, #112211, #224422)"
      padding="8rem 0 2rem 0"
      position="relative"
      mt={isMedium ? "16rem" : "6rem"}
      color="white"
    >
      <Grid
        container
        sx={{
          top: isMobile ? "10px" : "120px", // Mobile görünüşdə `top` deaktiv olur
          borderRadius: "15px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
        width="80%"
        backgroundColor={theme.palette.primary.light}
        margin="0 auto"
        position="absolute"
        left="50%"
        top={isMedium ? "-15%" : "3%"}
      >
        <Grid item xs={12} md={6} sx={{ padding: "16px" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              textAlign: "left",
              color: "white",
              textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)",
            }}
            gutterBottom
          >
            Turlardan xəbərdar ol
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              textAlign: "left",
              color: "black",
            }}
            gutterBottom
          >
            Həmən abunə olun!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              textAlign: "left",
              color: "grey",
            }}
            gutterBottom
          >
            Yeni turlardan və otellərdən, endirimlərdən ilk siz xəbərdar olun.
          </Typography>
          <SendEmailFromClient
            sxButtonSubscribe={{
              top:"5px",
              padding: "6px 12px",
              backgroundColor: "#112211",
              color: "#ffffff",
              borderRadius: "5px",
              textTransform: "capitalize",
              fontSize: "13px",
              fontWeight: 600,
              width: "100px",
              height: "48px",
              "&:hover": {
                backgroundColor: "#112211",
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isMobile && (
            <motion.img
              src="/assets/footer-img.png"
              alt="Footer"
              style={{ width: "70%", height: "auto" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
          )}
        </Grid>
      </Grid>

      {/* <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        width="80%"
        margin="0 auto"
        color="white"
      >
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Box gridColumn="span 1" key={i}>
              <List>
                {destinations.slice(i * 4, i * 4 + 4).map((destination) => (
                  <FooterRegionList
                    destination={destination}
                    key={uuidv4()}
                    sx={{
                      color: isDarkMode ? "white" : "black",
                    }}
                  />
                ))}
              </List>
            </Box>
          ))}
      </Box> */}

      {/* Sosial şəbəkələr */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginTop: isMobile ? "50px" : "110px",
          color: "white",
          paddingBottom: "10px",
        }}
      >
        <IconButton
          component={Link}
          to="https://www.facebook.com"
          sx={{ color: isDarkMode ? "white" : "black", margin: "0 8px" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="https://www.instagram.com"
          sx={{ color: isDarkMode ? "white" : "black", margin: "0 8px" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="https://wa.me"
          sx={{ color: isDarkMode ? "white" : "black", margin: "0 8px" }}
        >
          <WhatsAppIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;

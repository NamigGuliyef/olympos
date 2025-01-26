import {
  Box,
  Grid,
  IconButton,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import FooterRegionList from "./FooterRegionList";
import SendEmailFromClient from "./SendEmailFromClient";

const destinations = [
  { name: "Quba", url: "https://az.wikipedia.org/wiki/Quba" },
  { name: "Qusar", url: "https://az.wikipedia.org/wiki/Qusar" },
  { name: "Şahdağ", url: "https://az.wikipedia.org/wiki/%C5%9Eahda%C4%9F_(zirv%C9%99)" },
  { name: "Balakən", url: "https://az.wikipedia.org/wiki/Balak%C9%99n_rayonu" },
  { name: "Zaqatala", url: "https://az.wikipedia.org/wiki/Zaqatala_rayonu" },
  { name: "Qax", url: "https://az.wikipedia.org/wiki/Qax" },
  { name: "Şəki", url: "https://az.wikipedia.org/wiki/%C5%9E%C9%99ki" },
  { name: "Qəbələ", url: "https://az.wikipedia.org/wiki/Q%C9%99b%C9%99l%C9%99" },
  { name: "Lənkəran", url: "https://az.wikipedia.org/wiki/L%C9%99nk%C9%99ran" },
  { name: "Lerik", url: "https://az.wikipedia.org/wiki/Lerik_rayonu" },
  { name: "Astara", url: "https://az.wikipedia.org/wiki/Astara_rayonu" },
  { name: "Tufandağ", url: "https://az.wikipedia.org/wiki/Tufanda%C4%9F" },
];

const Footer = () => {
  const isMedium = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <Box
      background={`linear-gradient(135deg, #112211, #224422)`}
      padding="14rem 0 4rem 0"
      position="relative"
      mt={isMedium ? "28rem" : "10rem"}
      color="white"
    >
      <Grid
        container
        sx={{
          borderRadius: "20px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
        }}
        width="84%"
        backgroundColor={theme.palette.primary.light}
        margin="0 auto"
        position="absolute"
        left="50%"
        top={isMedium ? "-20%" : "5%"}
      >
        <Grid item xs={12} md={6} sx={{ padding: "24px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: "54px",
              textAlign: "left",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
            gutterBottom
          >
            Turlardan <br /> xəbərdar ol
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "25.26px",
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
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20px",
              textAlign: "left",
              color: "grey",
            }}
            gutterBottom
          >
            Yeni turlardan və otellərdən, endirimlərdən ilk siz xəbərdar olun.
          </Typography>
          <SendEmailFromClient
            sxButtonSubscribe={{
              padding: "8px 16px",
              backgroundColor: "#112211",
              color: "#ffffff",
              borderRadius: "5px",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "14px",
              fontWeight: 600,
              width: "104px",
              height: "56px",
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
              style={{ width: "80%", height: "auto" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </Grid>
      </Grid>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        width="85%"
        margin="0 auto"
        color="white"
      >
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Box gridColumn="span 1" key={i}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  textAlign: "left",
                  marginBottom: "8px",
                  textDecoration: "underline",
                }}
              >
                Bölgələr {i + 1}
              </Typography>
              <List>
                {destinations.slice(i * 4, i * 4 + 4).map((destination) => (
                  <FooterRegionList destination={destination} key={uuidv4()} />
                ))}
              </List>
            </Box>
          ))}
      </Box>

      {/* Sosial şəbəkələr hissəsi */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginTop: "20px",
          color: "white",
          paddingBottom: "20px", // Sosial şəbəkələrə daha çox yer ver
        }}
      >
        <IconButton
          component={Link}
          to="https://www.facebook.com"
          sx={{ color: "white", margin: "0 10px" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="https://www.instagram.com"
          sx={{ color: "white", margin: "0 10px" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="https://wa.me"
          sx={{ color: "white", margin: "0 10px" }}
        >
          <WhatsAppIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;

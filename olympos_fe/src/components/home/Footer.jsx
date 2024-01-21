import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendEmailFromClient from "./SendEmailFromClient";

const destinations = ["Gəncə", "Göyçay", "Şamaxı", "Quba"];

const sxMuiList = {
  width: "50%",
  textAlign: "center",
};

const sxButtonSubscribe = {
  padding: "8px 16px",
  backgroundColor: "#112211",
  color: "#ffffff",
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "17px",
  letterSpacing: "0em",
  textAlign: "left",
  width: "104px",
  height: "56px",

  "&:hover": {
    backgroundColor: "#112211",
  },
};

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const tablet = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      backgroundColor={theme.palette.primary.main}
      padding="14rem 0 4rem 0"
      position="relative"
      // mt="10rem"
      mt={isMobile ? "28rem " : "10rem"}
    >
      <Grid
        container
        // display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        // columnGap="7rem"
        sx={{
          borderRadius: "20px",

          transform: "translate(-50%, -50%)",
        }}
        width="84%"
        backgroundColor={theme.palette.primary.light}
        margin="0 auto"
        position="absolute"
        left="50%"
        top={isMobile ? "-20%" : "5%"}
        // columnGap="5rem"
      >
        <Grid item xs={12} md={6} sx={{ padding: "24px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: "54px",
              letterSpacing: "0em",
              textAlign: "left",
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
              letterSpacing: "0em",
              textAlign: "left",
            }}
            gutterBottom
          >
            The Travel
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
            gutterBottom
          >
            Get inspired! Receive travel discounts, tips and behind the scenes
            stories.
          </Typography>
          {/* footer */}
          <SendEmailFromClient sxButtonSubscribe={sxButtonSubscribe} />
          {/* <Stack direction="row" spacing={2}>
            <TextField
              label="Your email address here"
              sx={{ backgroundColor: "white", width: "473px", height: "56px" }}
            />

            <Button sx={sxButtonSubscribe}>Subscribe</Button>
          </Stack> */}
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
          <img
            src="/assets/footer-img.png"
            alt=""
            style={{ bottom: 0 }}

            // height="100%"
          />
        </Grid>
      </Grid>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        width="85%"
        margin="0 auto"
      >
        <Box
          gridColumn="span 1"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Olympos travel
          </Typography>
          <Box>
            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <YouTubeIcon />
            </IconButton>
            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Bölgələr
          </Typography>
          <List sx={sxMuiList}>
            {destinations.map((destination, id) => (
              <ListItem disablePadding disableGutters key={id}>
                <ListItemButton>
                  <ListItemText primary={destination} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Bölgələr haqqında
          </Typography>
          <List sx={sxMuiList}>
            {destinations.map((destination, id) => (
              <ListItem disablePadding disableGutters key={id}>
                <ListItemButton>
                  <ListItemText primary={destination} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Gəzməli yerlər
          </Typography>
          <List sx={sxMuiList}>
            {destinations.map((destination, id) => (
              <ListItem disablePadding disableGutters key={id}>
                <ListItemButton>
                  <ListItemText primary={destination} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

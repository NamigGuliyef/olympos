import StarRateIcon from "@mui/icons-material/StarRate";
import { theme } from "../../theme";
export function getStarRating(length) {
  console.log("length: " + length);
  return [...Array(length)].map((_, index) => (
    <StarRateIcon key={index} sx={{ color: `${theme.palette.primary.gold}` }} />
  ));
}

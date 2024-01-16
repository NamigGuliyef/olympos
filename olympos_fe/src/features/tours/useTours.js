import { useQuery } from "@tanstack/react-query";
import {
  fetchToursApi,
  fetchClientSideToursApi,
  fetchClientSingleTour,
} from "../../services/apiTours";

const useTours = (role) => {
  const { isLoading: isToursLoading, data: tours } = useQuery(
    ["tours"],
    role === "admin" ? fetchToursApi : fetchClientSideToursApi
  );

  return {
    isToursLoading,
    tours,
  };
};

export const useSingleTour = (id) => {
  const {
    isLoading: singleTourLoading,
    data: singleTour,
    error,
  } = useQuery({
    qeuryKey: ["tours", id],
    qeuryFn: () => fetchClientSingleTour(id),
  });

  return { singleTour, singleTourLoading, error };
};

export default useTours;

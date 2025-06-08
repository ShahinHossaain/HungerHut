import { useQuery } from "@tanstack/react-query";
import type { RestaurantSearchResult } from "../types";
import type { SearchState } from "../pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResult> => {
    const params = new URLSearchParams();
    console.log("searchState from", searchState);
    params.set("searchQuery", searchState.searchQuery);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants", city, searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return {
    results,
    isLoading,
  };
};

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
      throw error;
    }
  };

  const {
    data: restaurant,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["myRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant loaded successfully!");
  }

  if (isError) {
    toast.error("Failed to load restaurant");
  }

  return {
    restaurant,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    try {
      console.log("inside createMyRestaurantRequest", restaurantFormData);
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error(`Errorr: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
      console.error("Failed to create restaurant", error);
      throw error;
    }
  };

  const {
    mutate: createRestaurant,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (restaurantFormData: FormData) =>
      createMyRestaurantRequest(restaurantFormData),
  });
  if (isSuccess) {
    toast.success("Restaurant created successfully!");
  }

  if (isError) {
    toast.error("unable to create restaurant");
  }

  return {
    createRestaurant,
    isPending,
  };
};

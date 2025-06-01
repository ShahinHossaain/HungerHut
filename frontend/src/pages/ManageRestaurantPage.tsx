import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage: React.FC = () => {
  const { createRestaurant, isPending: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { isPending: isUpdateLoading, updateRestaurant } =
    useUpdateMyRestaurant();

  const isExistingRestaurant = !!restaurant;
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isExistingRestaurant ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;

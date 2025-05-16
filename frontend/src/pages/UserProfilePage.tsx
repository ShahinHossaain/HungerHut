import { useUpdateMyUser } from "../api/MyUserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage: React.FC = () => {
  const { isPending, updateUser } = useUpdateMyUser();
  return <UserProfileForm onSave={updateUser} isLoading={isPending} />;
};

export default UserProfilePage;

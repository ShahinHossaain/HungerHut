import { useGetMyUser, useUpdateMyUser } from "../api/MyUserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage: React.FC = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    <span>Unable to load user profile</span>;
  }

  return (
    <>
      {currentUser && (
        <UserProfileForm
          currentUser={currentUser}
          onSave={updateUser}
          isLoading={isPending}
        />
      )}
    </>
  );
};

export default UserProfilePage;

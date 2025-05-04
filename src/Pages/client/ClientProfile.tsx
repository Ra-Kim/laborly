import Spinner from "@/Components/ui/Spinner";
import { getClientProfile, getClientProfilePicture } from "@/redux/client/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { ChevronLeft, Pencil } from "lucide-react";
import UpdateClientProfile from "@/Components/modals/UpdateClientProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import UpdateProfilePicture from "@/Components/modals/UpdateProfilePicture";

const ClientProfile = () => {
  const { clientProfile: profile, loading , clientProfilePicture} = useAppSelector(
    ({ client }) => client
  );
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePic, setUpdatePic] = useState(false);

  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getClientProfile(""));
    dispatch(getClientProfilePicture(""));
  }, [dispatch]);
  return (
    <>
      {loading === "loading" ? (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-[75vh] bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-[6rem] h-[6rem]">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={clientProfilePicture} alt="pic" />
                    <AvatarFallback className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      {profile.first_name?.charAt(0)}
                      {profile.last_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Edit Button */}
                  <button
                    onClick={() => setUpdatePic(true)} // define this function
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Name and Title */}
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-gray-500">{profile.location}</p>
              </div>

              {/* Info Section */}
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">About</h3>
                  <p className="text-gray-600 mt-1">
                    {profile.profile_description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-gray-800">{profile.email}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p className="text-gray-800">{profile.phone_number}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address
                    </h4>
                    <p className="text-gray-800">{profile.address}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Location
                    </h4>
                    <p className="text-gray-800">{profile.location}</p>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Profile Created
                  </h4>
                  <p className="text-gray-700">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>

                  <h4 className="text-sm font-medium text-gray-500 mt-2">
                    Last Updated
                  </h4>
                  <p className="text-gray-700">
                    {new Date(profile.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-8 flex justify-center">
                <Sheet open={updateProfile} onOpenChange={setUpdateProfile}>
                  <SheetTrigger asChild>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                      Edit Profile
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side={"right"}
                    className="px-2 pt-0 w-full lg:min-w-[550px]"
                  >
                    <SheetTitle className="flex gap-2 py-4 items-center">
                      <div onClick={() => setUpdateProfile(false)}>
                        <ChevronLeft
                          size={24}
                          className="cursor-pointer w-6 h-6"
                        />
                      </div>
                      <p className="">Update profile</p>
                    </SheetTitle>
                    <UpdateClientProfile setAddModalOpen={setUpdateProfile} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sheet open={updatePic} onOpenChange={setUpdatePic}>
        <SheetTrigger></SheetTrigger>
        <SheetContent
          side={"right"}
          className="px-2 pt-0 w-full lg:min-w-[550px]"
        >
          <SheetTitle className="flex gap-2 py-4 items-center">
            <div onClick={() => setUpdatePic(false)}>
              <ChevronLeft size={24} className="cursor-pointer w-6 h-6" />
            </div>
            <p className="">Update Profile Picture</p>
          </SheetTitle>
          <UpdateProfilePicture setAddModalOpen={setUpdatePic} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ClientProfile;

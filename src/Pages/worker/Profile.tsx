import { getWorkerSummary } from "@/redux/reviews/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getWorkerKYC, getWorkerProfile } from "@/redux/worker/thunkActions";
import { CheckCircle2Icon, ChevronLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import UpdateProfile from "@/Components/modals/UpdateWorkerProfile";
import { IWorkerKYCStatus } from "@/types/worker";
import Spinner from "@/Components/ui/Spinner";
import UpdateKYC from "@/Components/modals/UpdateKYC";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import UpdateProfilePicture from "@/Components/modals/UpdateProfilePicture";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updateKYC, setUpdateKYC] = useState(false);
  const [updatePic, setUpdatePic] = useState(false);
  const { workerProfile, workerKYCStatus, loading, workerProfilePicture } =
    useAppSelector(({ worker }) => worker);
  const { workerReviewSummary } = useAppSelector(({ review }) => review);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getWorkerKYC(""));
    dispatch(getWorkerProfile("")).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getWorkerSummary(res.payload.id));
      }
    });
  }, [dispatch]);
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  return (
    <>
      {loading === "loading" ? (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex justify-end items-center gap-4">
            <div
              onClick={() => {
                if (
                  workerKYCStatus !== "APPROVED" &&
                  workerKYCStatus !== "PENDING"
                ) {
                  setUpdateKYC(true);
                }
              }}
              className={`text-[.6rem] sm:text-xs font-medium px-3 py-1 rounded-full cursor-pointer ${
                workerKYCStatus
                  ? statusColors[workerKYCStatus as IWorkerKYCStatus]
                  : "bg-red-100 text-red-700"
              }`}
            >
              KYC: {workerKYCStatus || "Not verified"}
            </div>
            <button
              className="flex items-center gap-1 text-gray-600 hover:underline text-sm"
              onClick={() => setUpdateProfile(true)}
            >
              <Pencil size={16} /> Edit Profile
            </button>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border group cursor-pointer flex flex-col md:flex-row gap-6 mt-10">
            {/* Profile Image */}
            <div className="relative w-[6rem] h-[6rem]">
              <Avatar className="w-full h-full">
                <AvatarImage src={workerProfilePicture} alt="pic" />
                <AvatarFallback className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {workerProfile.first_name?.charAt(0)}
                  {workerProfile.last_name?.charAt(0)}
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

            {/* Profile Details */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              {/* Name, Location, Experience */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-primary">
                    {workerProfile?.first_name} {workerProfile.last_name}
                    <span>
                      {workerProfile?.is_verified && (
                        <CheckCircle2Icon className="text-green-500" />
                      )}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {workerProfile.years_experience
                      ? `${workerProfile?.years_experience} year${
                          workerProfile.years_experience > 1 ? "s" : ""
                        } experience`
                      : "No experience added"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {workerProfile.phone_number || "No experience added"}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <MdLocationPin className="text-lg" />{" "}
                    {workerProfile.location || "No location added"}
                  </p>
                </div>

                {/* Ratings & Jobs */}
                <div className="flex flex-col sm:items-end">
                  <span className="text-sm text-gray-600">
                    Total reviews: {workerReviewSummary.total_reviews}
                  </span>
                  <div className="flex mt-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < workerReviewSummary.average_rating ? (
                          <FaStar className="text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-yellow-400" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="border-t border-b py-4 text-sm text-gray-700 leading-relaxed">
                <p>{workerProfile.bio || "No bio added"}</p>
                {/* Work experience */}
                <p className="mt-4">
                  Work experience:{" "}
                  {workerProfile.work_experience || "No work experience added"}
                </p>
              </div>
              {/* Note to workers */}
              {workerProfile?.availability_note && (
                <div className="border-b py-4 text-sm text-gray-700 leading-relaxed">
                  Note: {workerProfile.availability_note || ""}
                </div>
              )}

              {/* Skills */}
              <div>
                <h5 className="text-sm font-semibold text-gray-800 mb-2">
                  Skills
                </h5>
                <ul className="flex flex-wrap gap-2">
                  {workerProfile.professional_skills
                    ?.split(",")
                    ?.map((skill, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition duration-300"
                      >
                        {skill}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <Sheet open={updateKYC} onOpenChange={setUpdateKYC}>
            <SheetTrigger></SheetTrigger>
            <SheetContent
              side={"right"}
              className="px-2 pt-0 w-full lg:min-w-[550px]"
            >
              <SheetTitle className="flex gap-2 py-4 items-center">
                <div onClick={() => setUpdateKYC(false)}>
                  <ChevronLeft size={24} className="cursor-pointer w-6 h-6" />
                </div>
                <p className="">Update KYC</p>
              </SheetTitle>
              <UpdateKYC setAddModalOpen={setUpdateKYC} />
            </SheetContent>
          </Sheet>
          <Sheet open={updateProfile} onOpenChange={setUpdateProfile}>
            <SheetTrigger></SheetTrigger>
            <SheetContent
              side={"right"}
              className="px-2 pt-0 w-full lg:min-w-[550px]"
            >
              <SheetTitle className="flex gap-2 py-4 items-center">
                <div onClick={() => setUpdateProfile(false)}>
                  <ChevronLeft size={24} className="cursor-pointer w-6 h-6" />
                </div>
                <p className="">Update profile</p>
              </SheetTitle>
              <UpdateProfile setAddModalOpen={setUpdateProfile} />
            </SheetContent>
          </Sheet>
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

export default Profile;

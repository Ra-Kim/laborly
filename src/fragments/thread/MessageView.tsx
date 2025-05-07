import { FaStar, FaRegStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import MessageInput from "@/Components/ui/MessageInput";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getSingleThread } from "@/redux/messages/thunkActions";
import Spinner from "@/Components/ui/Spinner";
import dayjs from "dayjs";
import { IThread } from "@/types/messages";
import { useAuth } from "@/hooks/useAuth";
import { getWorkerById } from "@/redux/worker/thunkActions";
import { getWorkerSummary } from "@/redux/reviews/thunkActions";
import { getUserProfilePicture } from "@/redux/admin/thunkActions";
// import { Button } from "@/Components/ui/button";
// import CreateJobModal from "@/Components/modals/CreateJobModal";
// import { createJob } from "@/redux/jobs/thunkActions";

const MessageView = ({ thread_id }: { thread_id: string }) => {
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getSingleThread(thread_id));
  }, [dispatch, thread_id]);
  const {
    thread: { participants, messages },
    sendLoading,
  } = useAppSelector(({ message }) => message);
  function getOtherParticipant(
    participants: IThread["participants"],
    loggedInUserId: string
  ) {
    const other = participants?.find((p) => p.user.id !== loggedInUserId);
    return other ? other.user : null;
  }
  const otherParticipant = getOtherParticipant(participants, user.id);
  const { role } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  useEffect(() => {
    if (otherParticipant?.id) {
      dispatch(getUserProfilePicture(otherParticipant?.id || "")).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setProfilePicture(res.payload.url);
          }
        }
      );
      if (role() === "CLIENT") {
        dispatch(getWorkerById(otherParticipant.id));
        dispatch(getWorkerSummary(otherParticipant.id));
      }
    }
  }, [otherParticipant?.id, role(), thread_id, dispatch]);
  const { worker } = useAppSelector(({ worker }) => worker);
  const { workerReviewSummary } = useAppSelector(({ review }) => review);

  return (
    <div className="grid grid-cols-1 gap-2 max-h-[90vh] lg:max-h-[87vh] grid-rows-[1fr,auto] relative">
      <div className="h-full overflow-y-auto pb-20">
        {/* Details Section */}
        <div className="bg-gray-50 pl-3 w-full">
          <div className="flex flex-row sm:flex-col  sm:items-start lg:flex-row  gap-1 sm:gap-6 py-4">
            {/* Profile Image */}
            <div className="relative  ">
              <Avatar className="w-[3rem] h-[3rem]">
                <AvatarImage src={profilePicture || ""} alt="pic" />
                <AvatarFallback>
                  {otherParticipant?.first_name?.charAt(0)}
                  {otherParticipant?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Details */}
            <div className="flex flex-col gap-1">
              {/* Name, Location, Experience */}
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-primary">
                  {otherParticipant?.first_name} {otherParticipant?.last_name}
                </h3>
                {role() === "CLIENT" && (
                  <>
                    <p className="text-sm text-gray-500">
                      {worker.years_experience
                        ? `${worker?.years_experience} year${
                            worker.years_experience > 1 ? "s" : ""
                          } experience`
                        : "No experience added"}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <MdLocationPin className="text-lg" /> {worker.location}
                    </p>

                    {/* Ratings  */}

                    <div className="flex text-xs">
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
                  </>
                )}
              </div>
            </div>
            {/* <Button className="ml-auto rounded-lg h-12 place-self-end bg-green-500">
              Create Job
            </Button> */}
          </div>
        </div>
        {/* Chat section */}
        <div className="col-span-2">
          <div className="flex flex-col w-full bg-white shadow-lg rounded-l-lg border-l border-gray-300">
            <div className="flex-grow p-4 overflow-y-auto">
              {messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${
                    msg.sender.id !== user.id ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender.id !== user.id
                        ? "bg-blue-100 text-blue-900"
                        : "bg-green-100 text-green-900"
                    }`}
                  >
                    <div>{msg.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span>
                        {msg.sender.id !== user.id ? "Worker" : "Client"}
                      </span>{" "}
                      | <span>{dayjs(msg.timestamp).toString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {sendLoading === "loading" && (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <MessageInput thread_id={thread_id} />
      </div>
    </div>
  );
};

export default MessageView;

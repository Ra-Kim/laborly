import { FaStar, FaRegStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import MessageInput from "@/Components/ui/MessageInput";
import { useEffect, useMemo } from "react";
import { IUser } from "@/types/auth";
import { profileData } from "@/lib/constants";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getSingleThread } from "@/redux/messages/thunkActions";
import Spinner from "@/Components/ui/Spinner";

const MessageView = ({ thread_id }: { thread_id: string }) => {
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getSingleThread(thread_id));
  }, [dispatch]);
  const {
    thread: { messages },
    sendLoading,
  } = useAppSelector(({ message }) => message);
  // const { clientProfile } = useAppSelector(({ client }) => client);

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-10">
      {/* Details Section */}
      <div className="col-span-1 bg-gray-50">
        {profileData.slice(0, 1).map((artisanInfo) => (
          <div
            key={artisanInfo.id}
            className="cursor-pointer flex flex-row sm:flex-col items-center sm:items-start lg:flex-row lg:items-center gap-1 sm:gap-6 mt-10"
          >
            {/* Profile Image */}
            <div className="relative  ">
              <img
                src={artisanInfo.image}
                alt={artisanInfo.name}
                className="w-28 max-w-[10rem] object-cover rounded-2xl"
              />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col gap-1">
              {/* Name, Location, Experience */}
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-primary">
                  {artisanInfo.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {artisanInfo.experience}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MdLocationPin className="text-lg" /> {artisanInfo.location}
                </p>

                {/* Ratings  */}

                <div className="flex text-xs">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>
                      {index < artisanInfo.rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-yellow-400" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Chat section */}
      <div className="col-span-2">
        <div className="flex flex-col w-full bg-white shadow-lg rounded-l-lg border-l border-gray-300">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender_id === user.id ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender_id === user.id
                      ? "bg-blue-100 text-blue-900"
                      : "bg-green-100 text-green-900"
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>
                      {msg.sender_id === user.id ? "Worker" : "Client"}
                    </span>{" "}
                    | <span>{msg.timestamp}</span>
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
          <MessageInput thread_id={thread_id} />
        </div>
      </div>
    </div>
  );
};

export default MessageView;

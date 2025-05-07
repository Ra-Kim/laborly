import MessageView from "@/fragments/thread/MessageView";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { IThread } from "@/types/messages";
import { IUser } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import {  useAppThunkDispatch } from "@/redux/store";
import { getUserProfilePicture } from "@/redux/admin/thunkActions";

const ThreadCard = ({
  id,
  message,
  timeStamp,
  participants,
}: {
  id: string;
  message: string;
  timeStamp: string;
  participants: IThread["participants"];
}) => {
  function getOtherParticipant(
    participants: IThread["participants"],
    loggedInUserId: string
  ) {
    const other = participants?.find((p) => p.user.id !== loggedInUserId);
    return other ? other.user : null;
  }
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);
  const otherParticipant = getOtherParticipant(participants, user.id);
  const [modalOpen, setModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { role } = useAuth();
  const dispatch = useAppThunkDispatch();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  useEffect(() => {
    dispatch(getUserProfilePicture(otherParticipant?.id || "")).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setProfilePicture(res.payload.url);
      }
    });
  }, [dispatch, otherParticipant?.id]);
  return (
    <>
      <div
        className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition w-[97%] cursor-pointer"
        onClick={() => {
          if (isDesktop) {
            navigate(
              `/${
                role() === "CLIENT" ? "client" : "worker"
              }/messages?thread_id=${id}`
            );
          } else {
            setModalOpen(true);
          }
        }}
      >
        <Avatar className="w-[4rem] h-[4rem]">
          <AvatarImage src={profilePicture || ""} alt="pic" />
          <AvatarFallback>
            {otherParticipant?.first_name?.charAt(0)}
            {otherParticipant?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-800">
              {otherParticipant?.first_name} {otherParticipant?.last_name}
            </h4>
            <span className="text-xs text-gray-500">
              {new Date(timeStamp).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {message.slice(0, 30)}
            {message.length > 29 && <span>...</span>}
          </p>
          {/* <p className="text-xs text-gray-400 mt-1">{otherParticipant?.location}</p> */}
        </div>
      </div>
      <Sheet open={modalOpen} onOpenChange={setModalOpen}>
        <SheetTrigger></SheetTrigger>
        <SheetContent
          side={"right"}
          className="px-2 pt-0 w-full lg:min-w-[550px]"
        >
          <SheetTitle className="flex gap-2 py-4 items-center">
            <div onClick={() => setModalOpen(false)}>
              <ChevronLeft size={24} className="cursor-pointer w-6 h-6" />
            </div>
            <p className="">Messages</p>
          </SheetTitle>
          <MessageView thread_id={id} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ThreadCard;

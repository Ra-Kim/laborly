import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import Spinner from "@/Components/ui/Spinner";
import MessageView from "@/fragments/thread/MessageView";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { ChevronLeft, Hourglass } from "lucide-react";
import { myThreads } from "@/redux/messages/thunkActions";

const Messages = () => {
  const { threads, loading } = useAppSelector(({ message }) => message);
  const searchParams = useSearchParams();
  const thread_id = searchParams[0]?.get("thread_id") || "";
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
	dispatch(myThreads(""));
  }, [dispatch]);

  return (
	<div className="grid lg:grid-cols-2 h-full">
	  <div className="border-r-2">
		<h2>Messages</h2>
		<div>
		  {loading === "loading" ? (
			<div className="h-[60vh] w-full flex justify-center items-center">
			  <Spinner />
			</div>
		  ) : (
			<>
			  {threads.length === 0 ? (
				<div className="h-[60vh] w-full flex flex-col gap-4 justify-center items-center text-lg text-darkPrimary font-medium">
				  <p>No messages</p>
				</div>
			  ) : (
				threads.map((thread) => (
				  <ThreadCard
					id={thread.id}
					message={thread.messages[0]?.content}
					timeStamp={thread.messages[0]?.timestamp}
				  />
				))
			  )}
			</>
		  )}
		</div>
	  </div>
	  <div className="hidden lg:block">
		{thread_id ? (
		  <MessageView thread_id={thread_id} />
		) : (
		  <div className="h-[70vh] w-full flex flex-col gap-4 justify-center items-center text-lg text-darkPrimary font-medium">
			<Hourglass className="h-20 w-20" />
			<p>No message to display</p>
		  </div>
		)}
	  </div>
	</div>
  );
};

export default Messages;

const ThreadCard = ({
  id,
  message,
  timeStamp,
}: {
  id: string;
  message: string;
  timeStamp: string;
}) => {
  const { workerProfile } = useAppSelector(({ worker }) => worker);
  const [modalOpen, setModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  return (
	<>
	  <div
		className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition"
		onClick={
		  isDesktop
			? () => {
				navigate(`/messages?thread_id+${id}`);
			  }
			: () => {
				setModalOpen(true);
			  }
		}
	  >
		<img
		  src={workerProfile.profile_picture || "/default-avatar.png"}
		  alt="Profile"
		  className="w-14 h-14 rounded-full object-cover"
		/>
		<div className="flex-1">
		  <div className="flex justify-between items-center">
			<h4 className="text-lg font-semibold text-gray-800">
			  {workerProfile.first_name} {workerProfile.last_name}
			</h4>
			<span className="text-xs text-gray-500">
			  {new Date(timeStamp).toLocaleString()}
			</span>
		  </div>
		  <p className="text-sm text-gray-600 truncate">{message}</p>
		  <p className="text-xs text-gray-400 mt-1">{workerProfile.location}</p>
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
			<p className="">
			  {workerProfile?.first_name} {workerProfile?.last_name}
			</p>
		  </SheetTitle>
		  <MessageView thread_id={id} />
		</SheetContent>
	  </Sheet>
	</>
  );
};

import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import Spinner from "@/Components/ui/Spinner";
import MessageView from "@/fragments/thread/MessageView";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Hourglass } from "lucide-react";
import { myThreads } from "@/redux/messages/thunkActions";
import ThreadCard from "@/Components/cards/ThreadCard";

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
                    participants={thread.participants}
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

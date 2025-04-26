import { getSingleThread, replyConversation } from "@/redux/messages/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = ({ thread_id }: { thread_id: string }) => {
  const [message, setMessage] = useState("");
  const dispatch = useAppThunkDispatch();
  const { sendLoading } = useAppSelector(({ message }) => message);
  const handleSendMessage = () => {
    dispatch(
      replyConversation({
        id: thread_id,
        body: { content: message },
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getSingleThread(thread_id))
      }
    });
  };

  return (
    <div className="flex items-center p-4 bg-gray-100">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded-l-lg border border-gray-300"
        placeholder="Type a message..."
        readOnly={sendLoading === "loading"}
      />
      <button
        onClick={handleSendMessage}
        className="bg-primary px-3 py-4 text-white flex items-center justify-center gap-2 text-sm rounded-r-lg ml-2"
        disabled = {sendLoading === "loading"}
      >
        Send <IoIosSend />
      </button>
    </div>
  );
};

export default MessageInput;

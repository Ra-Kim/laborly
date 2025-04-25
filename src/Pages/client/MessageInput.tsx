import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");

	const handleSendMessage = () => {
		if (message.trim()) {
			onSendMessage({
				sender: "client",
				content: message,
				thread: "123", // Use a fixed thread ID or dynamically generate it
			});
			setMessage(""); // Clear the input after sending
		}
	};

	return (
		<div className="flex items-center p-4 bg-gray-100">
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="w-full p-2 rounded-l-lg border border-gray-300"
				placeholder="Type a message..."
			/>
			<button
				onClick={handleSendMessage}
				className="bg-primary px-3 py-4 text-white flex items-center justify-center gap-2 text-sm rounded-r-lg ml-2"
			>
				Send <IoIosSend />
			</button>
		</div>
	);
};

export default MessageInput;

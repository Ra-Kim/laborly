import React, { useState } from "react";
import MessageInput from "./MessageInput";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { profileData } from "@/lib/constants";

const ClientMessages = () => {
	const [messages, setMessages] = useState([
		{
			sender: "worker",
			content: "Hello! How can I help you today?",
			timestamp: new Date().toLocaleTimeString(),
			thread: "123", // A unique thread ID for the conversation
		},
		{
			sender: "client",
			content: "Hi, I need a worker for my project.",
			timestamp: new Date().toLocaleTimeString(),
			thread: "123",
		},
	]);

	const addMessage = (message) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ ...message, timestamp: new Date().toLocaleTimeString() },
		]);
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-10">
				{/* Chat section */}
				<div className="col-span-2">
					<div className="flex flex-col w-full bg-white shadow-lg rounded-l-lg border-l border-gray-300">
						<div className="flex-grow p-4 overflow-y-auto">
							{messages
								.filter((msg) => msg.thread === "123") // Filter messages based on the current thread
								.map((msg, index) => (
									<div
										key={index}
										className={`flex mb-2 ${
											msg.sender === "worker" ? "justify-start" : "justify-end"
										}`}
									>
										<div
											className={`p-3 rounded-lg max-w-xs ${
												msg.sender === "worker"
													? "bg-blue-100 text-blue-900"
													: "bg-green-100 text-green-900"
											}`}
										>
											<div>{msg.content}</div>
											<div className="text-xs text-gray-500 mt-1">
												<span>
													{msg.sender === "worker" ? "Worker" : "Client"}
												</span>{" "}
												| <span>{msg.timestamp}</span>
											</div>
										</div>
									</div>
								))}
						</div>
						<MessageInput onSendMessage={addMessage} />
					</div>
				</div>

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


			</div>
		</>
	);
};

export default ClientMessages;

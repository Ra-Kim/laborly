import React, { useState } from "react";
import JobDetail from "../../fragments/jobs/JobDetails";
import { IoCloseOutline } from "react-icons/io5";

const jobs = [
	{
		id: 1,
		title: "Paint Living Room",
		status: "In Progress",
		date: "2025-04-21",
		party: "Jane Smith (Artisan)",
		description: "Sky blue matte paint for the living room walls.",
	},
	{
		id: 2,
		title: "Fix Kitchen Sink",
		status: "Pending",
		date: "2025-04-19",
		party: "Michael Johnson (Client)",
		description: "Sink is leaking and may need new parts.",
	},
];

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-700",
	"In Progress": "bg-blue-100 text-blue-700",
	Completed: "bg-green-100 text-green-700",
	Cancelled: "bg-red-100 text-red-700",
};

const MyJobs = () => {
	const [displaySideModal, setDisplaySideModal] = useState(false);

	return (
		<div className="px-4 py-8 flex">
			{/* Job Listing */}
			<div>
				<h2 className="text-3xl font-bold mb-6">My Jobs</h2>

				<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 ">
					{jobs.map((job) => (
						<div
							key={job.id}
							className="p-5 rounded-xl card-shadow duration-200 flex flex-col"
						>
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="text-xl font-semibold">{job.title}</h3>
									<p className="text-sm text-gray-500">{job.date}</p>
								</div>
							</div>
							<p className="text-gray-700 mb-3">{job.description}</p>
							<div className="flex justify-between items-center">
								<span
									className={`text-[.6rem] sm:text-xs font-medium px-3 py-1 rounded-full ${
										statusColors[job.status]
									}`}
								>
									{job.status}
								</span>
								<button
									onClick={() => setDisplaySideModal(!displaySideModal)}
									className="btn  border border-gray-300 rounded-md hover:bg-gray-100 transition"
								>
									View Details
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Job Details */}

			{displaySideModal && (
				<div className="bg-white z-30 absolute right-0 top-0 bottom-0 max-w-md card-shadow">
					<IoCloseOutline
						onClick={() => setDisplaySideModal(!displaySideModal)}
						className="absolute top-5 left-5 text-xl"
					/>
					<JobDetail />
				</div>
			)}
		</div>
	);
};

export default MyJobs;

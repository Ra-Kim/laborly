import React, { useState } from "react";

const statusMap = {
	NEGOTIATING: "Negotiating",
	ACCEPTED: "Accepted",
	COMPLETED: "Completed",
	FINALIZED: "Finalized",
	CANCELLED: "Cancelled",
};

const statusStyles = {
	NEGOTIATING: "bg-yellow-100 text-yellow-800",
	ACCEPTED: "bg-blue-100 text-blue-800",
	COMPLETED: "bg-green-100 text-green-800",
	FINALIZED: "bg-indigo-100 text-indigo-800",
	CANCELLED: "bg-red-100 text-red-800",
};

const jobs = [
	{
		id: "job-001",
		service_title: "Laundry Services",
		worker_id: "John Doe",
		status: "NEGOTIATING",
		started_at: null,
		completed_at: null,
		cancelled_at: null,
		cancel_reason: null,
	},
	{
		id: "job-002",
		service_title: "House Cleaning",
		worker_id: "Jane Smith",
		status: "CANCELLED",
		started_at: "2025-04-01T10:00:00Z",
		completed_at: null,
		cancelled_at: "2025-04-01T12:00:00Z",
		cancel_reason: "Client unavailable",
	},
	{
		id: "job-003",
		service_title: "Gardening",
		worker_id: "Tony Greens",
		status: "COMPLETED",
		started_at: "2025-04-02T08:30:00Z",
		completed_at: "2025-04-02T11:45:00Z",
		cancelled_at: null,
		cancel_reason: null,
	},
];

const ClientJobs = () => {
	const [selectedJob, setSelectedJob] = useState(null);

	const openSidebar = (job) => {
		setSelectedJob(job);
	};

	const closeSidebar = () => {
		setSelectedJob(null);
	};

	const groupedJobs = Object.keys(statusMap).reduce((acc, status) => {
		acc[status] = jobs.filter((job) => job.status === status);
		return acc;
	}, {});

	return (
		<div className="p-6 bg-gray-50 min-h-screen relative">
			<h2 className="text-2xl font-bold mb-6">Job History</h2>

			{Object.entries(groupedJobs).map(([status, jobList]) => (
				<div key={status} className="mb-10">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">
						{statusMap[status]} ({jobList.length})
					</h3>

					{jobList.length ? (
						<div className="grid gap-6">
							{jobList.map((job) => (
								<div
									key={job.id}
									onClick={() => openSidebar(job)}
									className="cursor-pointer bg-white rounded-xl border p-5 shadow hover:shadow-md transition"
								>
									<div className="flex justify-between items-start mb-3">
										<div>
											<p className="text-sm text-gray-500">Job ID</p>
											<h3 className="text-md font-semibold text-gray-800">
												{job.id}
											</h3>
										</div>
										<span
											className={`px-3 py-1 text-xs rounded-full font-medium ${
												statusStyles[job.status]
											}`}
										>
											{statusMap[job.status]}
										</span>
									</div>

									<div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
										<div>
											<p className="font-medium text-gray-800">Service Title</p>
											<p>{job.service_title || "N/A"}</p>
										</div>
										<div>
											<p className="font-medium text-gray-800">
												Worker Assigned
											</p>
											<p>{job.worker_id || "Unassigned"}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500 italic">No jobs in this category.</p>
					)}
				</div>
			))}

			{/* Sidebar Modal */}
			{selectedJob && (
				<>
					<div
						className="fixed inset-0 bg-black bg-opacity-30 z-30"
						onClick={closeSidebar}
					></div>
					<div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white z-40 shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0">
						<div className="p-6 h-full flex flex-col">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-xl font-semibold">Job Details</h3>
								<button
									onClick={closeSidebar}
									className="text-gray-500 hover:text-red-500 text-lg font-bold"
								>
									&times;
								</button>
							</div>

							<div className="flex-1 overflow-y-auto space-y-4 text-sm text-gray-700">
								<div>
									<p className="text-gray-500">Job ID</p>
									<p className="font-medium text-gray-800">{selectedJob.id}</p>
								</div>

								<div>
									<p className="text-gray-500">Service Title</p>
									<p className="font-medium text-gray-800">
										{selectedJob.service_title || "N/A"}
									</p>
								</div>

								<div>
									<p className="text-gray-500">Worker Assigned</p>
									<p className="font-medium text-gray-800">
										{selectedJob.worker_id || "Unassigned"}
									</p>
								</div>

								<div>
									<p className="text-gray-500">Status</p>
									<span
										className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
											statusStyles[selectedJob.status]
										}`}
									>
										{statusMap[selectedJob.status]}
									</span>
								</div>

								<div>
									<p className="text-gray-500">Started At</p>
									<p>
										{selectedJob.started_at
											? new Date(selectedJob.started_at).toLocaleString()
											: "Not started"}
									</p>
								</div>

								<div>
									<p className="text-gray-500">Completed At</p>
									<p>
										{selectedJob.completed_at
											? new Date(selectedJob.completed_at).toLocaleString()
											: "Not completed"}
									</p>
								</div>

								{selectedJob.status === "CANCELLED" && (
									<>
										<div>
											<p className="text-gray-500">Cancelled At</p>
											<p>
												{selectedJob.cancelled_at
													? new Date(selectedJob.cancelled_at).toLocaleString()
													: "—"}
											</p>
										</div>

										<div>
											<p className="text-gray-500">Cancel Reason</p>
											<p className="italic text-red-600">
												{selectedJob.cancel_reason || "No reason provided"}
											</p>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ClientJobs;

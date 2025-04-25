import React from "react";

const jobData = {
	id: "123e4567-e89b-12d3-a456-426614174000",
	service_id: null,
	worker_id: "987e6543-e21b-45d3-c987-426614170999",
	status: "cancelled",
	started_at: "2025-04-24T10:30:00Z",
	completed_at: null,
	cancelled_at: "2025-04-25T08:00:00Z",
	cancel_reason: "Client not available at the time",
};
const ClientJobCard = () => {
	return (
		<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
			<h2 className="text-xl font-semibold text-gray-800 mb-2">
				Job ID: {jobData.id}
			</h2>

			<div className="text-sm text-gray-600 space-y-2">
				{/* Service ID */}
				<p>
					<span className="font-medium">Service ID:</span>{" "}
					{jobData.service_id || (
						<span className="italic text-gray-400">Not specified</span>
					)}
				</p>

				{/* Worker ID */}
				<p>
					<span className="font-medium">Worker ID:</span> {jobData.worker_id}
				</p>

				{/* Status */}
				<p>
					<span className="font-medium">Status:</span>{" "}
					<span
						className={`font-semibold px-2 py-1 rounded text-white ${
							jobData.status === "completed"
								? "bg-green-500"
								: jobData.status === "cancelled"
								? "bg-red-500"
								: "bg-blue-500"
						}`}
					>
						{jobData.status}
					</span>
				</p>

				{/* Timestamps */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
					{jobData.started_at && (
						<p>
							<span className="font-medium">Started At:</span>{" "}
							{new Date(jobData.started_at).toLocaleString()}
						</p>
					)}
					{jobData.completed_at && (
						<p>
							<span className="font-medium">Completed At:</span>{" "}
							{new Date(jobData.completed_at).toLocaleString()}
						</p>
					)}
					{jobData.cancelled_at && (
						<p>
							<span className="font-medium">Cancelled At:</span>{" "}
							{new Date(jobData.cancelled_at).toLocaleString()}
						</p>
					)}
				</div>

				{/* Cancel reason */}
				{jobData.cancel_reason && (
					<p className="text-red-500 font-medium">
						Cancel Reason:{" "}
						<span className="font-normal">{jobData.cancel_reason}</span>
					</p>
				)}
			</div>
		</div>
	);
};

export default ClientJobCard;

import React from "react";
import { MdLocationPin } from "react-icons/md";
import { useParams } from "react-router-dom";

import { JobStatus } from "@/types/jobs";

const ClientJobDetails = () => {
	const job = {
		id: 1,
		title: "Paint Living Room",
		status: "In Progress",
		date: "2025-04-21",
		client: "Sarah Miles",
		worker: "James Okoro",
		description: "Sky blue matte paint for the living room walls.",
		budget: "$150",
		location: "Lagos, Nigeria",
		notes: "Bring your own tools. Apartment is on 3rd floor.",
	};

	const statusColors = {
		Pending: "bg-yellow-100 text-yellow-700",
		"In Progress": "bg-blue-100 text-blue-700",
		Completed: "bg-green-100 text-green-700",
		Cancelled: "bg-red-100 text-red-700",
	};

	return (
		<div className="w-full px-4 py-14">
			<h3 className="text-xl mb-4">Job Details</h3>
			<div className="mb-6">
				<h4 className="text-2xl font-bold">{job.title}</h4>
				<p className="text-sm text-gray-500">{job.date}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<div className="space-y-3">
					<p>
						<span className="font-semibold">Worker:</span> {job.worker}
					</p>

					<p>
						<span className="font-semibold">Budget:</span> {job.budget}
					</p>
					<p>
						<span className="font-semibold">Started At:</span> {job.budget}
					</p>
					<p>
						<span className="font-semibold">Complete At:</span> {job.budget}
					</p>

					<p className="flex items-center gap-2">
						<MdLocationPin /> {job.location}
					</p>
				</div>
				<div>
					Status:
					<span
						className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
							statusColors[job.status as JobStatus]
						}`}
					>
						{job.status}
					</span>
				</div>
			</div>

			<div className="bg-white rounded-lg border p-6 shadow-sm">
				<h3 className="text-sm font-semibold mb-2">Job Description</h3>
				<p className="text-gray-700">{job.description}</p>

				{job.notes && (
					<>
						<h3 className="text-sm font-semibold mt-6 mb-2">
							Additional Notes
						</h3>
						<p className="text-gray-700">{job.notes}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default ClientJobDetails;

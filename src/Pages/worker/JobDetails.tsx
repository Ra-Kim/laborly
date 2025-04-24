import { JobStatus } from "@/types/jobs";

const JobDetail = () => {
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
		<div className="max-w-4xl mx-auto px-4 py-10">
			<h3>Job Details</h3>
			<div className="mb-6">
				<h2 className="text-3xl font-bold">{job.title}</h2>
				<p className="text-sm text-gray-500">{job.date}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<div className="space-y-3">
					<p>
						<span className="font-semibold">Client:</span> {job.client}
					</p>
					<p>
						<span className="font-semibold">Assigned Artisan:</span>{" "}
						{job.worker}
					</p>
					<p>
						<span className="font-semibold">Budget:</span> {job.budget}
					</p>
					<p>
						<span className="font-semibold">Location:</span> {job.location}
					</p>
				</div>
				<div>
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
				<h3 className="text-lg font-semibold mb-2">Job Description</h3>
				<p className="text-gray-700">{job.description}</p>

				{job.notes && (
					<>
						<h3 className="text-lg font-semibold mt-6 mb-2">
							Additional Notes
						</h3>
						<p className="text-gray-700">{job.notes}</p>
					</>
				)}
			</div>

			<div className="mt-8 flex gap-4">
				<button className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition">
					Cancel Job
				</button>
				<button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
					Mark as Completed
				</button>
			</div>
		</div>
	);
};

export default JobDetail;

import { Button } from "@/Components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { acceptJob, completeJob } from "@/redux/jobs/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getWorkerJobs } from "@/redux/worker/thunkActions";
import { IJob, jobStatus } from "@/types/jobs";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import CancelJob from "@/Components/modals/CancelJob";
import { getClientById } from "@/redux/client/thunkActions";
import { IClientProfile } from "@/types/client";
import { IService } from "@/types/service";
import { getServiceById } from "@/redux/services/thunkActions";

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

const WorkerJobs = () => {
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [cancelModal, setCancelModal] = useState(false);
  const { role } = useAuth();
  const openSidebar = (job: IJob) => {
    setSelectedJob(job);
  };

  const closeSidebar = () => {
    setSelectedJob(null);
  };

  const { jobs } = useAppSelector(({ worker }) => worker);
  const groupedJobs = useMemo(() => {
    return Object.keys(statusMap).reduce((acc, status) => {
      acc[status as jobStatus] = jobs.filter((job) => job.status === status);
      return acc;
    }, {} as Record<jobStatus, IJob[]>);
  }, [jobs]);
  useEffect(() => {
    console.log(groupedJobs)
  },[jobs])
  const [activeView, setActiveView] = useState<string | null>(null);

  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getWorkerJobs(""));
  }, [dispatch]);

  const acceptJobFunc = ({
    job_id,
    worker_id,
  }: {
    job_id: string;
    worker_id: string;
  }) => {
    dispatch(acceptJob({ job_id: job_id, worker_id: worker_id })).then(() => {
      if (selectedJob) {
        setSelectedJob({ ...selectedJob, status: "ACCEPTED" });
        dispatch(getWorkerJobs(""));
        setActiveView("ACCEPTED");
      }
    });
  };

  const completeJobFunc = (job_id: string) => {
    dispatch(completeJob(job_id)).then(() => {
      if (selectedJob) {
        setSelectedJob({ ...selectedJob, status: "COMPLETED" });
        dispatch(getWorkerJobs(""));
        setActiveView("COMPLETED");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h2 className="text-2xl font-bold mb-6">Job History</h2>

      {Object.entries(groupedJobs).map(([status, jobList]) => (
        <div
          key={status}
          className="mb-10"
          onClick={() =>
            activeView === statusMap[status as jobStatus]
              ? setActiveView(null)
              : setActiveView(statusMap[status as jobStatus])
          }
        >
          <div className="flex justify-between items-center cursor-pointer border-b-2 pb-4 mb-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {statusMap[status as jobStatus]} ({jobList.length})
            </h3>
            {statusMap[status as jobStatus] === activeView ? (
              <ChevronUpIcon className="text-gray-500" />
            ) : (
              <ChevronUpIcon className="text-gray-500 rotate-180" />
            )}
          </div>
          {statusMap[status as jobStatus] === activeView && (
            <>
              {jobList.length ? (
                <div className="grid gap-4">
                  {jobList.map((job) => (
                    <JobCard job={job} openSidebar={openSidebar} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No jobs in this category.
                </p>
              )}
            </>
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
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
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
                    <p className="font-medium text-gray-800">
                      {selectedJob.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Service Title</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.service_id || "N/A"}
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
                        statusStyles[selectedJob.status as jobStatus]
                      }`}
                    >
                      {statusMap[selectedJob.status as jobStatus]}
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
                            ? new Date(
                                selectedJob.cancelled_at
                              ).toLocaleString()
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
              <div>
                {selectedJob.status === "NEGOTIATING" && (
                  <div>
                    {role() === "WORKER" && (
                      <Button
                        className="w-full bg-green-500"
                        onClick={() =>
                          acceptJobFunc({
                            job_id: selectedJob.id,
                            worker_id: selectedJob?.worker_id,
                          })
                        }
                      >
                        ACCEPT JOB
                      </Button>
                    )}
                  </div>
                )}
                {selectedJob.status === "ACCEPTED" && (
                  <div>
                    {role() === "WORKER" && (
                      <Button
                        className="w-full"
                        onClick={() => completeJobFunc(selectedJob.id)}
                      >
                        MARK AS COMPLETE
                      </Button>
                    )}
                  </div>
                )}
                {(selectedJob.status === "ACCEPTED" ||
                  selectedJob.status === "NEGOTIATING") && (
                  <div>
                    {role() === "CLIENT" && (
                      <ResponsiveModal
                        open={cancelModal}
                        onOpenChange={setCancelModal}
                      >
                        <ResponsiveModalTrigger asChild>
                          <Button className="w-full">CANCEL JOB</Button>
                        </ResponsiveModalTrigger>
                        <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[600px] lg:min-h-[50vh]">
                          <ResponsiveModalHeader>
                            <ResponsiveModalTitle>
                              Update service
                            </ResponsiveModalTitle>
                          </ResponsiveModalHeader>
                          <CancelJob
                            setAddModalOpen={setCancelModal}
                            job_id={selectedJob.id}
                          />
                        </ResponsiveModalContent>
                      </ResponsiveModal>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkerJobs;

const JobCard = ({
  job,
  openSidebar,
}: {
  job: IJob;
  openSidebar: (job: IJob) => void;
}) => {
  const [service, setService] = useState<IService>();
  const [client, setClient] = useState<IClientProfile>();
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getClientById(job.client_id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setClient(res.payload);
      }
    });
  }, [dispatch, job.client_id]);

  useEffect(() => {
    dispatch(getServiceById(job.service_id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setService(res.payload);
      }
    });
  }, [dispatch, job.service_id]);

  return (
    <div
      key={job.id}
      onClick={() => openSidebar(job)}
      className="cursor-pointer bg-white rounded-xl border p-4 shadow hover:shadow-md transition"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-start">
        <div>
          <p className="font-medium text-gray-800">Job ID</p>
          <p>{job.id}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">Service Title</p>
          <p>{service?.title || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">Client name</p>
          <p>
            {client?.first_name || "-"} {client?.last_name || "-"}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            statusStyles[job.status as jobStatus]
          }`}
        >
          {statusMap[job.status as jobStatus]}
        </span>
      </div>
    </div>
  );
};

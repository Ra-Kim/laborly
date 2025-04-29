import Spinner from "@/Components/ui/Spinner";
import { getWorkerSummary } from "@/redux/reviews/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getWorkerById } from "@/redux/worker/thunkActions";
import { IWorkerSummary } from "@/types/reviews";
import { IWorkerProfile } from "@/types/worker";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import ViewWorker from "@/Components/modals/ViewWorker";
import { getFavoriteWorkers } from "@/redux/client/thunkActions";
import { IFavoriteWorker } from "@/types/client";

const WorkerFragment = () => {
  const { favoriteWorkers, loading } = useAppSelector(({ client }) => client);
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    dispatch(getFavoriteWorkers(""));
  }, [dispatch, location]);

  // const faves: IFavoriteWorker[] = [
  //   {

  //   }
  // ]

  return (
    <div>
      <section className="">
        {/*  */}
        {loading === "loading" ? (
          <div className="h-[60vh] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {favoriteWorkers.length === 0 ? (
              <div className="h-[60vh] w-full flex flex-col gap-4 justify-center items-center text-lg text-darkPrimary font-medium">
                <p>No workers have been added to favoorites</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {favoriteWorkers?.map((worker) => (
                  <Worker key={worker.id} worker={worker} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default WorkerFragment;

const Worker = ({ worker }: { worker: IFavoriteWorker }) => {
  //   const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const [workerData, setWorkerData] = useState<IWorkerProfile>();
  const [rating, setRating] = useState<IWorkerSummary>();
  const [viewWorker, setViewWorker] = useState(false);
  useEffect(() => {
    if (worker.worker_id) {
      dispatch(getWorkerSummary(worker.worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setRating(res.payload);
        }
      });
      dispatch(getWorkerById(worker.worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setWorkerData(res.payload);
        }
      });
    }
  }, [dispatch, worker.worker_id]);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border group cursor-pointer flex flex-col items-center text-center">
      {/* Profile Image */}
      <div className="relative mb-4">
        <Avatar className="w-[10rem] h-[10rem]">
          <AvatarImage src={workerData?.profile_picture || ""} alt="pic" />
          <AvatarFallback>
            {workerData?.first_name?.charAt(0)}
            {workerData?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name & Location */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-darkPrimary">
          {workerData?.first_name} {workerData?.last_name}
        </h2>
        <p className="text-sm text-gray-500">{workerData?.location}</p>
        <div className=" text-sm flex items-center justify-center m-auto my-2 text-center text-secondary">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < Number(rating?.average_rating) ? (
                <FaStar className="text-center text-yellow-400" />
              ) : (
                <FaRegStar className="text-center text-yellow-400" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="border-t-2 border-b-2 py-4">
        <p className="text-sm mt-2">{workerData?.bio.slice(0, 50)}... </p>
      </div>

      {/* Skills */}
      <div className="w-full mb-4">
        <h5 className="text-sm font-medium text-gray-700 group-hover:text-primary mb-2">
          Skills
        </h5>
        <ul className="flex flex-wrap justify-center gap-2">
          {workerData?.professional_skills
            ?.split(",")
            ?.slice(0, 3)
            ?.map((skill, idx) => (
              <li
                key={idx}
                className="bg-gray-100 group-hover:bg-white text-xs text-gray-800 px-3 py-1 rounded-full transition duration-300"
              >
                {skill}
              </li>
            ))}
        </ul>
      </div>

      {/* CTA Button */}
      <ResponsiveModal open={viewWorker} onOpenChange={setViewWorker}>
        <ResponsiveModalTrigger asChild>
          <button
            // onClick={() => navigate(`/artisans/${profile.id}`)}
            key={workerData?.id}
            className="mt-auto btn btn-primary w-full group-hover:bg-white group-hover:text-primary group-hover:border group-hover:border-primary transition-all"
          >
            View Profile <IoEyeOutline className="text-xl" />
          </button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[70vw] lg:min-h-[50vh]">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Profile</ResponsiveModalTitle>
          </ResponsiveModalHeader>
          {/* <CreateService
            setAddModalOpen={setAddModal}
            service={myServices.find((service) => service.id === id)}
          /> */}
          {workerData && rating && (
            <ViewWorker
              service_id={""}
              workerProfile={workerData}
              workerReviewSummary={rating}
            />
          )}
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
};

import { useAuth } from "@/hooks/useAuth";
import { getClientById } from "@/redux/client/thunkActions";
import { useAppThunkDispatch } from "@/redux/store";
import { getWorkerById } from "@/redux/worker/thunkActions";
import { IClientProfile } from "@/types/client";
import { IReview } from "@/types/reviews";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { IWorkerProfile } from "@/types/worker";

const ReviewCard = ({ review }: { review: IReview }) => {
  const [clientData, setClientData] = useState<IClientProfile>(
    {} as IClientProfile
  );
  const [workerData, setWorkerData] = useState<IWorkerProfile>(
    {} as IWorkerProfile
  );
  const dispatch = useAppThunkDispatch();
  const { role } = useAuth();
  useEffect(() => {
    if (role() === "WORKER") {
      dispatch(getClientById(review.reviewer_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setClientData(res.payload);
        }
      });
    }
    if (role() === "CLIENT") {
      dispatch(getWorkerById(review.worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setWorkerData(res.payload);
        }
      });
    }
  }, [dispatch, role()]);
  return (
    <div className="flex flex-col relative items-center justify-start gap-3 py-8  px-4 rounded-xl bg-white soft-shadow my-14  cursor-pointer">
      {/* Image container */}
      <div className="w-14 h-14 flex items-center justify-center m-auto rounded-full border-4 border-white shadow-lg  ">
        <Avatar className="w-[1.5rem] h-[1.5rem]">
          <AvatarImage src={workerData.profile_picture} alt="pic" />
          <AvatarFallback>
            <RiAccountPinCircleFill className="text-2xl" />
          </AvatarFallback>
        </Avatar>
      </div>

      <div>
        {/* Testimonial content */}
        <p className="text-xm text-center text-gray-600 mt-5 text-sm">
          {review.text}
        </p>
        {role() === "WORKER" ? (
          <>
            <h3 className="text-center text-xl mt-5 text-darkPrimary">
              {clientData?.first_name} {clientData?.last_name}
            </h3>
            <p className="text-primary text-xm text-center text-xs">
              {clientData?.business_name}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-center text-xl mt-5 text-darkPrimary">
              {workerData?.first_name} {workerData?.last_name}
            </h3>
            <p className="text-primary text-xm text-center text-xs">
              {workerData.location}
            </p>
          </>
        )}
        <div className=" text-sm flex items-center justify-center m-auto my-2 text-center text-secondary">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < review.rating ? (
                <FaStar className="text-center" />
              ) : (
                <FaRegStar className="text-center" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

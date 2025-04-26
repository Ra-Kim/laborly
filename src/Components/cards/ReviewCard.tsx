import { getClientById } from "@/redux/client/thunkActions";
import {  useAppThunkDispatch } from "@/redux/store";
import { IClientProfile } from "@/types/client";
import { IReview } from "@/types/reviews";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";

const ReviewCard = ({ review }: { review: IReview }) => {
  const [clientData, setClientData] = useState<IClientProfile>(
    {} as IClientProfile
  );
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getClientById(review.reviewer_id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setClientData(res.payload);
      }
    });
  }, [dispatch]);
  return (
    <div className="flex flex-col relative items-center justify-start gap-3 py-8  px-4 rounded-xl bg-white soft-shadow my-14  cursor-pointer">
      {/* Image container */}
      <div className="w-14 h-14 flex items-center justify-center m-auto rounded-full border-4 border-white shadow-lg  ">
        <RiAccountPinCircleFill className="text-2xl" />
      </div>

      <div>
        {/* Testimonial content */}
        <p className="text-xm text-center text-gray-600 mt-5 text-sm">
          {review.text}
        </p>
        <h3 className="text-center text-xl mt-5 text-darkPrimary">
          {clientData?.first_name} {clientData?.last_name}
        </h3>
        <p className="text-primary text-xm text-center text-xs">
          {clientData?.business_name}
        </p>
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

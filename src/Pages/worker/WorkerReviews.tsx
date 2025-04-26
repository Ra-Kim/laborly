import ReviewCard from "@/Components/cards/ReviewCard";
import Spinner from "@/Components/ui/Spinner";
import { getWorkerReviews } from "@/redux/reviews/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { IUser } from "@/types/auth";
import { useEffect, useMemo } from "react";

const WorkerReviews = () => {
  const { reviews, loading } = useAppSelector(({ review }) => review);
  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }, []);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getWorkerReviews(user.id));
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between items-center pb-2 border-b-2">
        <h2>Reviews</h2>
      </div>
      {loading === "loading" ? (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {reviews.length === 0 ? (
            <div className="h-[60vh] w-full flex flex-col gap-4 justify-center items-center text-lg text-darkPrimary font-medium">
              <p>No reviews found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
              {reviews.map((review) => {
                return <ReviewCard key={review.id} review={review} />;
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkerReviews;

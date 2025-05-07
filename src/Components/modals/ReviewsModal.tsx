import { getWorkerReviews } from "@/redux/reviews/thunkActions";
import ReviewCard from "../cards/ReviewCard";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";

const ReviewsModal = ({ workerId }: { workerId: string }) => {
  const { reviews, loading } = useAppSelector(({ review }) => review);

  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getWorkerReviews(workerId));
  }, [dispatch]);
  return (
    <div className="h-full overflow-y-auto">
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
            <div className="grid grid-cols-1 gap-8 px-4 py-8">
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

export default ReviewsModal;

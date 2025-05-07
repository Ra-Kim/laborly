import { useAuth } from "@/hooks/useAuth";
import { IReview } from "@/types/reviews";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ review }: { review: IReview }) => {
  const { client, worker, text, rating, created_at, job } = review;
  const { role } = useAuth();
  const isWorker = role() === "WORKER";
  const user = isWorker ? client : worker;

  return (
    <div className="flex flex-col  sm:flex-1 w-full  max-w-full bg-white rounded-2xl shadow-md p-6 gap-4">
      {/* Header with avatar and name */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={""} alt={`${user.first_name} ${user.last_name}`} />
          <AvatarFallback>
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-darkPrimary">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(created_at))} ago
          </p>
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
        {text}
      </p>

      {/* Rating */}
      <div className="flex gap-1 text-yellow-500">
        {Array.from({ length: 5 }, (_, index) =>
          index < rating ? (
            <FaStar key={index} />
          ) : (
            <FaRegStar key={index} />
          )
        )}
      </div>

      {/* Job info */}
      <div className="mt-2">
        <p className="text-xs text-gray-500 italic">
          Reviewed for: <strong>{job?.service?.title}</strong> in{" "}
          {job?.service?.location}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
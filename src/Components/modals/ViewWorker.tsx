import { IWorkerSummary } from "@/types/reviews";
import * as Yup from "yup";
import { IWorkerProfile } from "@/types/worker";
import { CheckCheck, CheckCircle2Icon } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { IoIosSend } from "react-icons/io";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppThunkDispatch } from "@/redux/store";
import { startConversation } from "@/redux/messages/thunkActions";
import Spinner from "../ui/Spinner";
import { createJob } from "@/redux/jobs/thunkActions";
import FavouriteWorker from "../app/FavouriteWorker";

const ViewWorker = ({
  service_id,
  workerProfile,
  workerReviewSummary,
  worker_id
}: {
  service_id: string;
  worker_id: string;
  workerProfile: IWorkerProfile;
  workerReviewSummary: IWorkerSummary;
}) => {
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState("");
  const validationSchema = Yup.object({
    content: Yup.string().required("Required"),
  });

  const {
    // register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {},
  });

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    setLoading(true);
    const res = await dispatch(
      startConversation({
        content: data.content,
        service_id: service_id,
        receiver_id: workerProfile.id,
      })
    );
    if (res.meta.requestStatus === "fulfilled") {
      setValue("content", "");
      dispatch(
        createJob({
          service_id: service_id,
          thread_id: res.payload.thread_id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setThreadId(res.payload.thread_id);

          setLoading(false);
        }
      });
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border group cursor-pointer flex flex-col md:flex-row gap-6 mt-10">
        {/* Profile Image */}
        <div className="relative mb-4">
          <Avatar className="w-[10rem] h-[10rem]">
            <AvatarImage src={workerProfile?.profile_picture || ""} alt="pic" />
            <AvatarFallback>
              {workerProfile?.first_name?.charAt(0)}
              {workerProfile?.last_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          {/* Name, Location, Experience */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-primary">
                  {workerProfile?.first_name} {workerProfile.last_name}
                  <span>
                    {workerProfile?.is_verified && (
                      <CheckCircle2Icon className="text-green-500" />
                    )}
                  </span>
                </h3>
                <FavouriteWorker worker_id={worker_id} />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {workerProfile.years_experience
                  ? `${workerProfile?.years_experience} year${
                      workerProfile.years_experience > 1 ? "s" : ""
                    } experience`
                  : "No experience added"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {workerProfile.phone_number || "No experience added"}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <MdLocationPin className="text-lg" />{" "}
                {workerProfile.location || "No location added"}
              </p>
            </div>

            {/* Ratings & Jobs */}
            <div className="flex flex-col sm:items-end">
              <span className="text-sm text-gray-600">
                Total reviews: {workerReviewSummary.total_reviews}
              </span>
              <div className="flex mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {index < workerReviewSummary.average_rating ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-yellow-400" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-b py-4 text-sm text-gray-700 leading-relaxed">
            <p>{workerProfile.bio || "No bio added"}</p>
            {/* Work experience */}
            <p className="mt-4">
              Work experience:{" "}
              {workerProfile.years_experience
                ? `${workerProfile?.years_experience} year${
                    workerProfile.years_experience > 1 ? "s" : ""
                  } experience`
                : "No experience added"}
            </p>
          </div>
          {/* Note to workers */}
          {workerProfile?.availability_note && (
            <div className="border-b py-4 text-sm text-gray-700 leading-relaxed">
              Note: {workerProfile.availability_note || ""}
            </div>
          )}

          {/* Skills */}
          <div>
            <h5 className="text-sm font-semibold text-gray-800 mb-2">Skills</h5>
            <ul className="flex flex-wrap gap-2">
              {workerProfile.professional_skills
                ?.split(",")
                ?.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition duration-300"
                  >
                    {skill}
                  </li>
                ))}
            </ul>
          </div>
          {service_id && (
            <>
              {threadId ? (
                <div className="flex gap-2 items-center justify-center mt-4">
                  <CheckCheck className="text-green-500" />
                  <p className="text-sm text-gray-700">
                    Message sent successfully! You can check your messages{" "}
                    <a
                      href={`/client/messages?thread_id=${threadId}`}
                      className="text-blue-500 underline"
                    >
                      here
                    </a>
                  </p>
                </div>
              ) : (
                <form
                  className="flex lg:grid lg:grid-cols-[80%,20%] gap-4 mt-4 flex-col lg:flex-row"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* CTA Button */}
                  <Controller
                    control={control}
                    name={`content`}
                    render={({ field: { onChange, value, name } }) => (
                      <Textarea
                        className={
                          errors?.[name]?.message ? "border border-red-500" : ""
                        }
                        labelText=""
                        id={name}
                        name={name}
                        placeholder="Initaite conversation with the worker"
                        error={errors?.[name]?.message}
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                      />
                    )}
                  />
                  <button
                    className="w-full  py-3 bg-primary text-white rounded-lg max-h-[45px] flex items-center justify-center gap-2 hover:scale-95"
                    disabled={loading}
                  >
                    Message{" "}
                    {loading ? (
                      <Spinner className="text-white" />
                    ) : (
                      <IoIosSend className="text-xl" />
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewWorker;

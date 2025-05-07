import Spinner from "@/Components/ui/Spinner";
import { getWorkerSummary } from "@/redux/reviews/thunkActions";
import { searchServices } from "@/redux/services/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { IWorkerSummary } from "@/types/reviews";
import { IService } from "@/types/service";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/Components/ui/select";
import { LOCATIONS } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import ViewWorker from "@/Components/modals/ViewWorker";
import { useInView } from "react-intersection-observer";
import { getUserProfilePicture } from "@/redux/admin/thunkActions";

const ServiceFragment = () => {
  const { searchedServices, loading } = useAppSelector(
    ({ service }) => service
  );

  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useAppThunkDispatch();
  // Handle title with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(
        searchServices({
          location,
          query
        })
      );
    }, 500); // 500ms debounce for title

    return () => clearTimeout(delayDebounce);
  }, [dispatch, query]);

  // Handle location instantly
  useEffect(() => {
    if (location === "All") setLocation("");
    dispatch(
      searchServices({
        location,
        query,
      })
    );
  }, [dispatch, location]);
  const SEARCH_LOCATIONS = [{ value: "All", label: "All" }, ...LOCATIONS];

  return (
    <div>
      <section className="">
        <div className="flex gap-4 lg:px-8 lg:flex-row flex-col">
          <div className="p-2 border-2 rounded flex items-center gap-3 h-9 w-full lg:w-[18rem]">
            <SearchIcon className="w-4 h-4" />
            <input
              type="search"
              id="search"
              placeholder="Search"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              className="border-none outline-none w-[18rem]"
            />
          </div>
          <Select
            value={location}
            onValueChange={(value) => {
              setLocation(value);
            }}
            name={"location"}
          >
            <SelectTrigger
              className="!h-9 w-full text-sm lg:w-[18rem] rounded p-1 min-h-[36px] border-2 border-border"
              value={location}
            >
              {SEARCH_LOCATIONS?.find((val) => val.value === location)
                ?.label || (
                <span className="text-[#50555C99] text-[15px] font-medium">
                  Select location
                </span>
              )}
            </SelectTrigger>
            <SelectContent className="max-h-[45vh]">
              {SEARCH_LOCATIONS?.map((item) => (
                <SelectItem key={item.value} value={`${item.value}`}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/*  */}
        {loading === "loading" ? (
          <div className="h-[60vh] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:p-8 p-2">
            {searchedServices?.map((service) => (
              <Service key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ServiceFragment;

export const Service = ({ service }: { service: IService }) => {
  //   const navigate = useNavigate();
  const { worker } = service;
  const dispatch = useAppThunkDispatch();
  const [rating, setRating] = useState<IWorkerSummary>();
  const [workerProfilePicture, setWorkerProfilePicture] = useState<string>();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [viewWorker, setViewWorker] = useState(false);
  useEffect(() => {
    if (inView && service.worker_id) {
      dispatch(getWorkerSummary(service.worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setRating(res.payload);
        }
      });
      dispatch(getUserProfilePicture(service.worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setWorkerProfilePicture(res.payload.url);
        }
      });
    }
  }, [dispatch, service.worker_id, inView]);
  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border group cursor-pointer flex flex-col items-center text-center"
    >
      {/* Profile Image */}
      <div className="relative mb-4">
        <Avatar className="w-[10rem] h-[10rem]">
          <AvatarImage src={workerProfilePicture || ""} alt="pic" />
          <AvatarFallback>
            {worker?.first_name?.charAt(0)}
            {worker?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name & Location */}
      <div className="mb-4">
        <div className="flex items-center gap-2 justify-center">
          <h2 className="text-lg font-semibold text-darkPrimary">
            {worker?.first_name} {worker?.last_name}
          </h2>
        </div>
        <h3 className="text-2xl font-semibold text-primary">{service.title}</h3>
        <p className="text-sm text-gray-500">{service?.location}</p>
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
        <p className="text-sm mt-2">{worker?.bio?.slice(0, 50)}... </p>
      </div>

      {/* Skills */}
      <div className="w-full mb-4">
        <h5 className="text-sm font-medium text-gray-700 group-hover:text-primary mb-2">
          Skills
        </h5>
        <ul className="flex flex-wrap justify-center gap-2">
          {worker?.professional_skills
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
            key={service.id}
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
          {worker && rating && (
            <ViewWorker
              service_id={service.id}
              workerProfile={worker}
              worker_id={service.worker_id}
              workerReviewSummary={rating}
            />
          )}
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
};

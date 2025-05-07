import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/Components/ui/select";
import { LOCATIONS } from "@/lib/constants";
import Footer from "@/Components/common/Footer";
import { IService } from "@/types/service";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { SearchIcon } from "lucide-react";
import { Service } from "@/fragments/clients/Services";
import Spinner from "@/Components/ui/Spinner";
import { searchServices } from "@/redux/services/thunkActions";
//
const Artisans = () => {
  const { searchedServices, loading } = useAppSelector(
    ({ service }) => service
  );
  const [filterItems, setFilterItems] = useState<IService[]>(searchedServices);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(searchServices({ location: "", query: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (location === "All") setLocation("");
    // Filter artisans by location and title
    const filteredItems =
      location === "" && title === ""
        ? searchedServices
        : searchedServices.filter((data) => {
            const matchesLocation =
              location === "" || data.location === location;
            const includesValue =
              title === "" ||
              data.title.toLowerCase().includes(title.toLowerCase()) ||
              data.worker.first_name
                .toLowerCase()
                .includes(title.toLowerCase()) ||
              data.worker.last_name.toLowerCase().includes(title.toLowerCase());

            return matchesLocation && includesValue;
          });
    setFilterItems(filteredItems);
  }, [location, title, searchedServices]);

  const SEARCH_LOCATIONS = [{ value: "All", label: "All" }, ...LOCATIONS];

  return (
    <>
      <section className="container">
        {/* Filter Header */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-xl w-full shadow-md">
          {/* State Filter */}
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

          {/* Search */}
          <div className="p-2 border-2 rounded flex items-center gap-3 h-9 w-full lg:w-[18rem]">
            <SearchIcon className="w-4 h-4" />
            <input
              type="search"
              id="search"
              placeholder={`Search ${filterItems.length || ""} services`}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="border-none outline-none w-[18rem]"
            />
          </div>
        </div>

        {loading === "loading" ? (
          <div className="h-[60vh] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="py-10">
            {/* Artisans section */}
            <div className="bg-white rounded-xl p-6 soft-shadow md:col-span-3 xl:col-span-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {filterItems.slice(0, 12).map((service) => (
                  <Service key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Artisans;

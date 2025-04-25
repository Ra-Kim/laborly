import ServiceCard from "@/Components/cards/ServiceCard";
import { Button } from "@/Components/ui/button";
import Spinner from "@/Components/ui/Spinner";
import { getMyServices } from "@/redux/services/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import CreateService from "@/Components/modals/CreateService";

const Services = () => {
  const { loading, myServices } = useAppSelector(({ service }) => service);
  const [addModal, setAddModal] = useState(false);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getMyServices(""));
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between items-center pb-2 border-b-2">
        <h2>Services</h2>
        <ResponsiveModal open={addModal} onOpenChange={setAddModal}>
          <ResponsiveModalTrigger asChild>
            <Button>Create service</Button>
          </ResponsiveModalTrigger>
          <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[600px] lg:min-h-[50vh]">
            <ResponsiveModalHeader>
              <ResponsiveModalTitle>Create service</ResponsiveModalTitle>
            </ResponsiveModalHeader>
            <CreateService setAddModalOpen={setAddModal} />
          </ResponsiveModalContent>
        </ResponsiveModal>
      </div>
      {loading === "loading" ? (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {myServices.length === 0 ? (
            <div className="h-[60vh] w-full flex flex-col gap-4 justify-center items-center text-lg text-darkPrimary font-medium">
              <p>No services found</p>
              <Button onClick={() => setAddModal(true)}>Create service</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
              {myServices.map((service) => {
                return (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    location={service.location}
                    id={service.id}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;

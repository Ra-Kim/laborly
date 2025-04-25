import { useAppSelector } from "@/redux/store";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import { useState } from "react";
import CreateService from "../modals/CreateService";

interface ServiceCardProps {
  title: string;
  description: string;
  location: string;
  id: string;
}

const ServiceCard = ({
  title,
  description,
  location,
  id,
}: ServiceCardProps) => {
  const [addModal, setAddModal] = useState(false);
  const { myServices } = useAppSelector(({ service }) => service);

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg transition">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <div className="text-sm text-gray-500 flex gap-2 mt-1">
        <MapPin /> {location}
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <ResponsiveModal open={addModal} onOpenChange={setAddModal}>
          <ResponsiveModalTrigger asChild>
            <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
              <Pencil size={16} /> Edit
            </button>
          </ResponsiveModalTrigger>
          <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[600px] lg:min-h-[50vh]">
            <ResponsiveModalHeader>
              <ResponsiveModalTitle>Update service</ResponsiveModalTitle>
            </ResponsiveModalHeader>
            <CreateService
              setAddModalOpen={setAddModal}
              service={myServices.find((service) => service.id === id)}
            />
          </ResponsiveModalContent>
        </ResponsiveModal>

        <button className="flex items-center gap-1 text-red-600 hover:underline text-sm">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

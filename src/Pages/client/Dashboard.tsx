import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ServiceFragment from "@/fragments/clients/Services";

const ClientDashboard = () => {
  const [params, setSearchParams] = useSearchParams();
  const view = params.get("view") || "Services";
  const [viewState, setViewState] = useState("Payroll set-up");
  useEffect(() => {
    setViewState(view.replace("+", ""));
  }, [view]);
  const handleTabChange = (tab: string) => {
    setViewState(tab);
    setSearchParams({ view: tab }); // Updates the URL
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-10 lg:gap-10 pt-5 pb-2 px-0 title-small text-[#475569] overflow-x-auto whitespace-nowrap">
          {["Services", "Workers"].map((tab) => {
            return (
              <div
                key={tab}
                className={`${
                  viewState === tab
                    ? "border-b-4 border-primary pb-1 text-primary"
                    : ""
                } cursor-pointer`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      <div className="py-4">
        {viewState === "Services" && <ServiceFragment />}
        {viewState === "Workers" && <>W</>}
      </div>
    </div>
  );
};

export default ClientDashboard;

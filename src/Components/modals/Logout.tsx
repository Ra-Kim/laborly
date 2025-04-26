import { logOut } from "@/redux/auth/thunkActions";
import { useAppThunkDispatch } from "@/redux/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  setLogoutModal,
}: {
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    const res = await dispatch(logOut(""));
    if (res.meta.requestStatus === "fulfilled") {
      localStorage.clear();
      navigate(`/auth/sign-in`);
    }
  };
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white text-[#475569] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col items-center justify-center gap-3">
              <p className="text-base text-center font-bold max-w-[20rem]">
                Are you sure you want to logout?
              </p>

              <div className="mt-12 flex flex-row items-center gap-3">
                <button
                  className="bg-[#F1F5F9] py-3 w-[7rem] rounded-md"
                  onClick={() => {
                    setLogoutModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={"bg-[#E11D48] py-3 rounded-md px-4 text-white"}
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

import React, { useState } from "react";
import { useAuth } from "../context/Usercontext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const Modal = () => {
  const { activateModal } = useAuth();
  const { register, handleSubmit } = useForm();

  const [role, setRole] = useState("Viewer");

  const tabData = [
    {
      id: 1,
      tabName: "Editor",
      type: "Editor",
    },
    {
      id: 2,
      tabName: "Viewer",
      type: "Viewer",
    },
  ];

  const onSubmit = async (data) => {
    try {
      const token = Cookies.get('accessToken')
      data.role = role
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/document/access`,
        { data },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      toast.success("Access updates successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error.message);
    }
  };
  return (
    <div className="z-50 bg-black/80 ">
      <div className=" fixed left-[50%] top-[50%] z-50 bg-white grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border  p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex justify-end">
          <button onClick={activateModal}>X</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center">
            <span>DocumentId</span>
            <input
              type="text"
              className="   font-semibold tracking-wide text-black bg-transparent border-b border-slate-500 outline-none focus:outline-none"
              {...register("documentId")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <span>Email</span>
            <input
              type="text"
              className="   font-semibold tracking-wide text-black bg-transparent border-b border-slate-500 outline-none focus:outline-none"
              {...register("email")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <span>Role</span>
            <div
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
            >
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRole(tab.type)}
                  className={`${
                    role === tab.type
                      ? "bg-emerald-500 text-white"
                      : "bg-transparent text-black"
                  } py-2 px-5 rounded-full transition-all duration-200`}
                >
                  {tab?.tabName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/Usercontext";
const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await auth.signup(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen flex items-start max-md:flex-col py-3">
      <div className="relative md:w-1/2 w-full h-full flex flex-col sm:p-20 ">
        <div className=" absolute  left-[10%] flex flex-col">
          <h1 className="text-4xl font-poppins font-semibold">
            Create an Account
          </h1>
        </div>
        <img
          src="/images/register.png"
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2 w-full h-full  flex flex-col  md:p-15 lg:p-20 p-2 justify-between">
        <h1 className="text-4xl font-semibold text-emerald-400"> RichDoc</h1>

        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Register</h3>
            <p className="text-sm mb-2">Create an account</p>
          </div>
        </div>
        <div className="w-full flex flex-col text-black">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full py-4 my-4 placeholder-emerald-400 font-semibold tracking-wide text-black bg-transparent border-b border-slate-500 outline-none focus:outline-none"
              placeholder="Email"
              {...register("email")}
            />

            <input
              type="password"
              className="w-full py-4 my-4 placeholder-emerald-400 font-semibold tracking-wide text-black bg-transparent border-b border-slate-500 outline-none focus:outline-none"
              placeholder="password"
              {...register("password")}
            />

            <button type="submit" disabled={loading} className="flex">
              {loading ? "Submiting" : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal">
            Have an account?
            <span className="font-semibold underline  underline-offset-2 cursor-pointer">
              <button onClick={() => navigate(-1)}> Sign In </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

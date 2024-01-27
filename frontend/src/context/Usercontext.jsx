import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
const Usercontext = createContext();
export const useAuth = () => React.useContext(Usercontext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/getUser", {
          withCredentials: true,
        });

        toast.success("User Fetched successfully");

        setUser(response?.data.user);
      } catch (error) {
        console.error(error);
        toast.error("Unable to get User ");
      }
    };

    fetchUser();
  }, []);

  const signin = async (data) => {
    const toastId = toast.loading("Loading");

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signin",
        data
      );
      
      Cookies.set("accessToken", response.data?.accessToken);

      setUser(response.data?.user);

      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);

      toast.error(`${error.response?.data.message}`);
      throw error.response;
    }
  };

  const signout = async () => {
    const toastId = toast.loading("Loading");
    try {
      const response = await axios.post("http://localhost:3001/auth/signout",{}, {
        withCredentials: true,
      });
      toast.dismiss(toastId);
      Cookies.remove('accessToken')
      toast.success("User signout");
    } catch (error) {
      toast.dismiss(toastId);

      toast.error(`${error.response?.data.message}`);
      throw error.response?.data;
    }
  };

  const signup = async (data) => {
    const toastId = toast.loading("Loading");
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signup",
        data
      );
      toast.dismiss(toastId);
      toast.success("User created successfully");
    } catch (error) {
      toast.dismiss(toastId);

      toast.error(`${error.response?.data.message}`);
      throw error.response?.data;
    }
  };
  return (
    <Usercontext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </Usercontext.Provider>
  );
};

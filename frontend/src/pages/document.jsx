import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useAuth } from "../context/Usercontext";

const Document = (props) => {
  let { id } = useParams();

  const { activateModal } = useAuth();

  const [title, setTitle] = useState("");
  const [readOnly, setreadOnly] = useState(false);

  const debouncedTitle = useDebounce(title, 200);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/document/access/${id}`,
          { withCredentials: true }
        );

        console.log(response);
        if(response.data.user.role === 'Viewer'){
          setreadOnly(true)
        }
       
      } catch (e) {
        console.log(e?.message);
      }
    };

    fetchDocument();
  }, []);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/document/get/${id}`,
          { withCredentials: true }
        );

        setTitle(response.data.title);
      } catch (e) {
        console.log(e?.message);
      }
    };

    fetchDocument();
  }, []);

  useEffect(() => {
    const updateTitle = async () => {
      if (debouncedTitle) {
        try {
          const token = Cookies.get("accessToken");
          const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/document/updateTitle/${id}`,
            { data: title },
            {
              headers: {
                Authorization: token,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateTitle();
  }, [debouncedTitle]);

  return (
    <div className="flex flex-col">
      <div className="flex bg-teal-600 px-4 py-2 justify-between">
        <input
          type="text"
          name="title"
          value={title}
          className="  placeholder-emerald-400 font-semibold tracking-wide text-slate-100 bg-transparent  outline-none focus:outline-none"
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={activateModal}>Add User</button>
      </div>
      <Editor read = {readOnly}/>
    </div>
  );
};

export default Document;

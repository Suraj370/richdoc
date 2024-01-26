import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Usercontext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `http://localhost:3001/document/getDocs`,
            { withCredentials: true }
          );

          setUserDocuments(response.data);
        }
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserDocuments();
  }, [user]);

  const onCreateDocument = async () => {
    try {
      const data = { title: "Untitled", content: "Untitled" };

      const response = await axios.post(
        "http://localhost:3001/document/createdoc",
        data,
        { withCredentials: true }
      );

      toast.success("document created successfully");

      // Use navigate to redirect to the specific document route
      navigate(`/document/${response.data?.document._id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  const onDeleteDocument = async (documentId) => {
    try {
      const token = Cookies.get('accessToken')
      const response = await axios.delete(
        "http://localhost:3001/document/deletedoc",
        documentId,
       {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
       }
      );

      setUserDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc._id !== documentId)
      );
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-11/12 mx-auto py-4 h-full">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
          {user && (
            <>
              <button
                onClick={onCreateDocument}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Create Document
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userDocuments.map((document) => (
            <div
              key={document._id}
              className="p-4 border rounded-md shadow-md hover:shadow-lg cursor-pointer flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{document.title}</h2>
              <p className="text-gray-500 flex-grow">{document.content}</p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => navigate(`/document/${document._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                >
                  Open
                </button>
                <button
                  onClick={() => onDeleteDocument(document._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!user && (
            <p className="text-gray-600 col-span-full">
              You must be signed in to view docs
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow mt-8">
        <h1 className="text-3xl font-bold text-gray-800">Shared Documents</h1>
        <div className="text-gray-600">No Documents found</div>
      </div>
    </div>
  );
};

export default Home;

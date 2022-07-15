import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import { Data } from "../../component/New feed/NewFeed";
import { db } from "../../firebase";
import ReactHtmlParser from "react-html-parser";
import Footer from "../../component/Footer/Footer";
import { AuthContext } from "../../context/authContext";
const Post = () => {
  let { id } = useParams();
  const [data, setData] = useState<Data>({});
  const { state } = useContext(AuthContext);
  useEffect(() => {
    document.title = data.title ?? "Loading....";
  }, [data]);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "posts", id || ""),
      async (doc) => {
        setData(doc.data() || {});
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      <Header loginSuccess={state.loginSuccess} />
      {/* Breadcrumb  */}
      <nav
        className="flex px-4 md:px-6 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {data.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className=" my-7 min-h-screen">
        <div className="mt-3">
          <h1 className="text-center font-bold text-3xl">{data.title}</h1>
          <div className=" p-4 md:px-20 xl:p-40 text-base md:text-lg  ">
            {ReactHtmlParser(data.content)}
          </div>
        </div>
        {data.author === state.currentUser.uid ? (
          <Link
            to={`/edit/${id}`}
            className=" text-blue-400 hover:text-blue-500 bg-white max-w-max font-medium text-sm md:text-lg px-5 flex flex-row underline ml-auto mr-20 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <p>Chỉnh sửa</p>
          </Link>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default Post;

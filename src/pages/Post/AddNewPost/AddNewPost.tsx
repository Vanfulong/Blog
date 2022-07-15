import React, { useContext, useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import Header from "../../../component/Header/Header";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/authContext";

const AddNewPost = () => {
  (window as any).global = window;
  useEffect(() => {
    document.title = "Đăng bài viết - BLOG";
  }, []);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const { state } = useContext(AuthContext);

  const handleAddButtonClick = async () => {
    if (
      title !== "" &&
      thumbnail !== "" &&
      draftToHtml(convertToRaw(editorState.getCurrentContent())) !== "<p></p>"
    ) {
      try {
        await addDoc(collection(db, "posts"), {
          pubdate: JSON.stringify(Timestamp.now().toDate()),
          author: state.currentUser.uid,
          title: title,
          urlThumbnail: thumbnail,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        });
        console.log("Add success");
        setTitle("");
        setThumbnail("");
        setEditorState(EditorState.createEmpty());
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Vui long nhap day du thong tin");
    }
  };

  return (
    <>
      <Header loginSuccess />
      <div className="p-6">
        <span className="text-2xl font-bold block w-full text-center mb-7">
          Dang Bai Viet
        </span>
        Tiêu đề
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          className="w-full my-2 p-2 text-lg border-black border"
          placeholder="Tieu de"
        />
      </div>
      <div className="p-6">
        Link Thumbnail
        <input
          onChange={(e) => {
            setThumbnail(e.target.value);
          }}
          value={thumbnail}
          type="text"
          className="w-full my-2 p-2 text-lg border-black border"
          placeholder="Link Thumbnail"
        />
      </div>
      <div className=" m-6 border">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="border p-3 scroll-m-1 heightEditor"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            console.log(editorState);
          }}
        />
      </div>
      <button
        onClick={handleAddButtonClick}
        className="flex mx-auto my-7 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Đăng bài
      </button>
    </>
  );
};

export default AddNewPost;

import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../component/Header/Header";
import { Data } from "../../../component/New feed/NewFeed";
import { db } from "../../../firebase";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const EditPost = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data>({});

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Chỉnh sửa bài viết - Blog";
  }, []);
  useEffect(() => {
    var unsub = onSnapshot(
      doc(db, "posts", id ?? ""),
      (doc) => {
        setData(doc.data() || {});
        const sampleMarkup = doc.data()!.content;
        const blocksFromHTML = htmlToDraft(sampleMarkup || "<div></div>");
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
        setTitle(doc.data()!.title);
        setThumbnail(doc.data()!.urlThumbnail);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleEditButtonClick = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "posts", id ?? ""), {
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        title: title,
        urlThumbnail: thumbnail,
      });
      alert("Da thay doi thong tin thanh cong");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header loginSuccess />
      <div className="p-6">
        <span className="text-2xl font-bold block w-full text-center mb-7">
          Chinh sua Bai Viet
        </span>
        Tiêu đề
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={data.title ?? ""}
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
          value={data.urlThumbnail ?? ""}
          type="text"
          className="w-full my-2 p-2 text-lg border-black border"
          placeholder="Link Thumbnail"
        />
      </div>
      <div className=" m-6 border">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="border p-3 scroll-m-1 h-[50vh]"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            console.log(editorState);
          }}
        />
      </div>
      <button
        onClick={handleEditButtonClick}
        className="flex  mx-auto my-7 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Xác Nhận
      </button>
    </div>
  );
};

export default EditPost;

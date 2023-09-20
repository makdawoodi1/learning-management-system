import React, { useMemo } from 'react';
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { useLocation } from 'react-router-dom';



const EditorPreview = ({ value }) => {
  const { pathname } = useLocation();

  return (
    <div className={pathname.includes("course/" ? "" : "bg-white")}>
        <ReactQuill
            className={pathname.includes("enrolled-course/") ? "react-quill-enrolled-course" : ""}
            style={{ height: "400px" }}
            theme='bubble'
            value={value}
            readOnly
        ></ReactQuill>
    </div>
  );
}

export default EditorPreview
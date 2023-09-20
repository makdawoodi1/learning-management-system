import React, { useMemo } from 'react';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Editor = ({ onChange, value, disabled }) => {

  return (
    <div className='bg-white'>
        <ReactQuill
            style={{ height: "400px" }}
            readOnly={disabled}
            theme='snow'
            value={value}
            onChange={onChange}
        ></ReactQuill>
    </div>
  );
}

export default Editor
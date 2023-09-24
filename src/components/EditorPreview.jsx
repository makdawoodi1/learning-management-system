import { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "@/components/editorStyles.css";
import { useLocation } from "react-router-dom";

const EditorPreview = ({ value, height }) => {
  const { pathname } = useLocation();
  const editor = useRef(null);

  // Editor Instance
  const getEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  return (
    <div className={pathname.includes("course/") ? "" : "bg-white"}>
      <SunEditor
        setContents={value}
        hideToolbar={true}
        disable={true}
        disableToolbar={true}
        getEditorInstance={getEditorInstance}
        width="100%"
        height={height ?? "400px"}
        showController={false}
        showInline={false}
      />
    </div>
  );
};

export default EditorPreview;

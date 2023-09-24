import { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./editorStyles.css"

// Import Functions
import {
  handleDrop,
  handleImageUploadBefore,
  imageUploadHandler,
  handleImageUploadError,
  handleAudioUploadBefore,
  handleAudioUpload,
  handleAudioUploadError,
  handleVideoUploadBefore,
  handleVideoUpload,
  handleVideoUploadError,
} from './editoruploader'

function Editor({ 
  name, 
  placeholder,
  hide,
  setState,
  setEditorContent,
  value,
}) {
  const editor = useRef(null);

  // Editor Instance
  const getEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleChange = () => {
    setState(state => ({
      ...state,
      active: state.getState()
    }))
    setEditorContent(value);
  }

  return (
    <>
      <SunEditor
        setOptions={{
          buttonList: [
            ["font", "fontSize"],
            ["undo", "redo"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "removeFormat",
              "fontColor",
              "hiliteColor",
              "link",
            ],
            ["indent", "outdent", "align", "list", "horizontalRule", "table"],
            ["image", "video", "audio"],
            ["preview", "fullScreen"],
          ],
          dialogBox: {
            linkBox: {
              title: "Insert Link",
              url: "URL to link",
              text: "Text to display",
              newWindowCheck: "Open in new window",
              downloadLinkCheck: "Download link",
            },
            imageBox: {
              title: "Insert image",
              url: "Image URL",
              altText: "Alternative text",
            },
            videoBox: {
              title: "Insert Video",
              file: "Select from files",
              url: "Media embed URL, YouTube/Vimeo",
            },
            audioBox: {
              title: "Insert Audio",
              file: "Select from files",
              url: "Audio URL",
            },
          },
          menu: {
            spaced: "Spaced",
            bordered: "Bordered",
            neon: "Neon",
            translucent: "Translucent",
            shadow: "Shadow",
            code: "Code",
          },
        }}
        getEditorInstance={getEditorInstance}
        width="100%"
        height="400px"
        name={name}
        hide={hide}
        placeholder={placeholder}
        onChange={handleChange}
        setContents={value}
        // onDrop={handleDrop}

        // Images Handler
        onImageUploadBefore={handleImageUploadBefore}
        imageUploadHandler={imageUploadHandler}
        onImageUploadError={handleImageUploadError}

        // Audios Handler
        onAudioUploadBefore={handleAudioUploadBefore}
        onAudioUpload={handleAudioUpload}
        onAudioUploadError={handleAudioUploadError}

        // Videos Handler
        onVideoUploadBefore={handleVideoUploadBefore}
        onVideoUpload={handleVideoUpload}
        onVideoUploadError={handleVideoUploadError}
      />
    </>
  );
}

export default Editor;

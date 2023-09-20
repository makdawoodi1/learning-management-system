import AuthContext from "@/context/context";
import { useContext } from "react";

const useCourseState = () => {
  const { courseState, setCourseState } = useContext(AuthContext);

  const updateCourseState = (type, { name, selectedModule, selectedLesson, keys, uploadResponse=null }) => {
    switch (name) {
      case "course-thumbnail":
        setCourseState((prev) => ({
          ...prev,
          thumbnail: type === "file-upload" ? uploadResponse : "",
          courseFolderKey: keys.folderKey,
          errors: null
        }));
        break;

      case "introductory-video":
        setCourseState((prev) => ({
          ...prev,
          introductoryVideo: type === "file-upload" ? uploadResponse : "",
          courseFolderKey: keys.folderKey,
          errors: null
        }));
        break;

      case "lesson-files":
        // Add Folder Keys
        selectedModule.moduleFolderKey = keys.moduleKey;
        selectedLesson.lessonFolderKey = keys.lessonKey;

        // Add Attachments
        type === "file-upload" &&
          selectedLesson.lessonFiles.push(uploadResponse);
        setCourseState((prev) => ({
          ...prev,
          courseFolderKey: keys.folderKey,
          modules: prev.modules.map((module) => {
            if (module.id === selectedModule.id) {
              return {
                // Update the specific module
                ...module,
                ...selectedModule,
                lessons: module.lessons.map((lesson) => {
                  if (lesson.id === selectedLesson.id) {
                    // Update the specific lesson
                    return {
                      ...lesson,
                      ...selectedLesson,
                    };
                  }
                  return lesson;
                }),
              };
            }
            return module;
          }),
        }));
        break;
    }
  };

  return { updateCourseState };
};

export default useCourseState;

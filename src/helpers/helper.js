export const capitalizeFirstLetter = (string) => {
  return string.charAt(1).toUpperCase() + string.slice(2);
};

export const generateUniqueID = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

export const filterAndValidateCourse = (input) => {
  const errors = {};

  const courseFolderKey = validateObjectProperty(
    input,
    "courseFolderKey",
    "courseFolderKey",
    errors
  );
  const courseTitle = validateObjectProperty(
    input,
    "courseTitle",
    "courseTitle",
    errors
  );
  const courseDescription = validateObjectProperty(
    input,
    "courseDescription",
    "courseDescription",
    errors
  );
  const price = validateNumber(input.price, "price", errors);
  const introductoryVideo = filterAndValidateLessonFile(
    input.introductoryVideo,
    errors
  );
  const thumbnail = filterAndValidateLessonFile(input.thumbnail, errors);

  const modules = [];
  if (Array.isArray(input.modules)) {
    for (let i = 0; i < input.modules.length; i++) {
      const module = filterAndValidateModule(input.modules[i], errors);
      modules.push(module);
    }
  }
  if (modules.length === 0) errors.modules = "Modules are missing or invalid";
  // if (!modules.filter(module => module.lessons.length === 0).length)  {
  //   errors.lessons = "At least 1 lesson is required in each module"
  // }

  return {
    courseFolderKey,
    courseTitle,
    courseDescription,
    price,
    introductoryVideo,
    thumbnail,
    modules: modules ?? [],
    errors: Object.keys(errors).length === 0 ? {} : errors,
  };
};

const validateObjectProperty = (obj, prop, propName, errors) => {
  if (!obj || typeof obj !== "object") {
    errors[propName] = `${propName} is missing`;
    return null;
  }
  const value = obj[prop];
  if (value === undefined || value === null) {
    errors[propName] = `${propName} is missing`;
    return null;
  }
  return value;
};

const validateNumber = (value, propName, errors) => {
  if (!value || typeof value !== "number") {
    errors[propName] = `${propName} is missing`;
    return null;
  }

  return value;
};

const filterAndValidateModule = (module, errors) => {
  if (!module || typeof module !== "object") {
    errors.modules = "Modules are missing or invalid";
    return null;
  }
  const filteredModule = {
    title: module.title || null,
    description: module.description || null,
    moduleFolderKey: module.moduleFolderKey || null
  };

  const lessons = [];
  if (Array.isArray(module.lessons)) {
      for (let i = 0; i < module.lessons?.length; i++) {
        const lesson = filterAndValidateLesson(module.lessons[i], errors);
        lessons.push(lesson);
      }
  }
  // Check if there's at least 1 lesson
  // if (lessons.length === 0) errors.lessons = "At least 1 lesson is required in each module";
  filteredModule.lessons = lessons;

  // Check for missing properties
  if (
    !filteredModule.title ||
    !filteredModule.description
  ) {
    errors.modules = "Module properties are missing";
  }

  return filteredModule;
};

const filterAndValidateLesson = (lesson, errors) => {
  if (!lesson || typeof lesson !== "object") {
    errors.lessons = "Lessons are missing or invalid";
    return null;
  }
  const filteredLesson = {
    title: lesson.title || null,
    description: lesson.description || null,
    content: lesson.content || null,
    lessonFolderKey: lesson.lessonFolderKey || null
  };

  const lessonFiles = [];
  if (Array.isArray(lesson.lessonFiles)) {
    for (let i = 0; i < lesson.lessonFiles.length; i++) {
      const lessonFile = filterAndValidateLessonFile(lesson.lessonFiles[i], errors);
      lessonFiles.push(lessonFile);
    }
  }
  filteredLesson.lessonFiles = lessonFiles;


  // Check for missing properties
  if (
    !filteredLesson.title ||
    !filteredLesson.description ||
    !filteredLesson.content
  ) {
    errors.lessons = "Lesson properties are missing";
  }

  return filteredLesson;
};

const filterAndValidateLessonFile = (file, errors) => {
  if (!file || typeof file !== "object") {
    errors.lessonFiles = "Lesson files are missing or invalid";
    return null;
  }
  const filteredFile = {
    objectKey: file.objectKey || null,
    formattedSize: file.formattedSize || null,
    size: file.size || null,
    name: file.name || null,
    type: file.type || null,
    url: file.url || null,
    secureURL: file.secureURL || null,
    preview: file.preview || null,
  };

  // Check for missing properties
  if (
    !filteredFile.formattedSize ||
    !filteredFile.size ||
    !filteredFile.name ||
    !filteredFile.type ||
    !filteredFile.url ||
    !filteredFile.secureURL
  ) {
    errors.lessonFiles = "Lesson files properties are missing";
  }

  return filteredFile;
};

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
  const introductoryVideo = filterAndValidateFile(
    'introductoryVideo',
    'Introductory video',
    input.introductoryVideo,
    errors
  );
  const thumbnail = filterAndValidateFile('thumbnail', 'Thumbnail', input.thumbnail, errors);

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
  if ((!value && value !== 0) || typeof value !== "number") {
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

  const lessons = [];
  if (Array.isArray(module.lessons)) {
      for (let i = 0; i < module.lessons?.length; i++) {
        const lesson = filterAndValidateLesson(module.lessons[i], errors);
        lessons.push(lesson);
      }
  }
  // Check if there's at least 1 lesson
  // if (lessons.length === 0) errors.lessons = "At least 1 lesson is required in each module";
  module.lessons = lessons;

  const quizzes = [];
  if (Array.isArray(module.quizzes)) {
      for (let i = 0; i < module.quizzes?.length; i++) {
        const quiz = filterAndValidateQuiz(module.quizzes[i], errors);
        quizzes.push(quiz);
      }
  }
  // Check if there's at least 1 quiz
  // if (lessons.length === 0) errors.lessons = "At least 1 lesson is required in each module";
  module.quizzes = quizzes;

  // Check for missing properties
  if (
    !module.title ||
    !module.description
  ) {
    errors.modules = "Module properties are missing";
  }

  return module;
};

const filterAndValidateLesson = (lesson, errors) => {
  if (!lesson || typeof lesson !== "object") {
    errors.lessons = "Lessons are missing or invalid";
    return null;
  }

  const lessonFiles = [];
  if (Array.isArray(lesson.lessonFiles)) {
    for (let i = 0; i < lesson.lessonFiles.length; i++) {
      const lessonFile = filterAndValidateFile('lessonFiles', 'Lesson files', lesson.lessonFiles[i], errors);
      lessonFiles.push(lessonFile);
    }
  }
  lesson.lessonFiles = lessonFiles;

  const lessonContentFiles = [];
  if (Array.isArray(lesson.lessonContentFiles)) {
    for (let i = 0; i < lesson.lessonContentFiles.length; i++) {
      const lessonFile = filterAndValidateFile('lessonContentFiles', 'Lesson Content files', lesson.lessonContentFiles[i], errors);
      lessonContentFiles.push(lessonFile);
    }
  }
  lesson.lessonContentFiles = lessonContentFiles;


  // Check for missing properties
  if (
    !lesson.title ||
    !lesson.description ||
    !lesson.content
  ) {
    errors.lessons = "Lesson properties are missing";
  }

  return lesson;
};

const filterAndValidateFile = (key, name, file, errors) => {
  if (!file || typeof file !== "object") {
    errors[key] = `${name} are missing or invalid`;
    return null;
  }

  // Check for missing properties
  if (
    !file.formattedSize ||
    !file.path ||
    !file.secureURL ||
    !file.objectKey
  ) {
    errors[key] = `${name} properties are missing`;
  }

  return file;
};

export const filterAndValidateQuiz = (quiz) => {
  const errors = {};

  const quizTitle = validateObjectProperty(
    quiz,
    "quizTitle",
    "quizTitle",
    errors
  );
  const quizDescription = validateObjectProperty(
    quiz,
    "quizDescription",
    "quizDescription",
    errors
  );
  const quizTimer = validateNumber(quiz.quizTimer, "quizTimer", errors);
  const quizTimerOptions = validateObjectProperty(
    quiz,
    "quizTimerOptions",
    "quizTimerOptions",
    errors
  )
  const quizAttemptNumbers = validateNumber(quiz.quizAttemptNumbers, "quizAttemptNumbers", errors);
  const quizPassingMarks = validateNumber(quiz.quizPassingMarks, "quizPassingMarks", errors);

  const questions = [];
  // if (Array.isArray(quiz.questions)) {
  //   for (let i = 0; i < quiz.questions.length; i++) {
  //     const quiz = filterAndValidateQuizQuestion(quiz.questions[i], errors);
  //     questions.push(quiz);
  //   }
  // }
  // if (questions.length === 0) errors.quizzes = "Quiz Questions are missing or invalid";
  // if (!modules.filter(module => module.lessons.length === 0).length)  {
  //   errors.lessons = "At least 1 lesson is required in each module"
  // }

  return {
    quizTitle,
    quizDescription,
    quizTimer,
    quizTimerOptions,
    quizAttemptNumbers,
    quizPassingMarks,
    questions: questions ?? [],
    errors: Object.keys(errors).length === 0 ? {} : errors,
  };
};

export const filterAndValidateQuizQuestion = (question) => {
  const errors = {}
  if (!question || typeof question !== "object") {
    errors.quizzes = "Quiz Questions are missing or invalid";
    return null;
  }
  const filteredQuestion = {
    question: question.question || null,
    type: question.type || null,
    options: question.options || [],
    correctAnswer: question.correctAnswer || null,
  };

  // Check for missing properties
  if (
    !filteredQuestion.question ||
    !filteredQuestion.type ||
    !filteredQuestion.options ||
    !filteredQuestion.correctAnswer
  ) {
    errors.quizzes = "Quiz question properties are missing";
  }

  return {
    question: filteredQuestion.question,
    questionType: filteredQuestion.type,
    options: filteredQuestion.options,
    correctAnswer: filteredQuestion.correctAnswer,
    errors: Object.keys(errors).length === 0 ? {} : errors,
  };
};
export const enrolledCourse = {
  course_id: 1,
  title: "Sample Course",
  description: "This is a sample course description.",
  instructor_id: 101,
  modules: [
    {
      module_id: 1,
      title: "Module 1",
      lessons: [
        {
          lesson_id: 1,
          title: "Lesson 1",
          description: "Markdown content for Lesson 1...",
          attachements: {
            images: [
              { image_id: 1, image_url: "" },
              { image_id: 2, image_url: "" },
            ],
            videos: [
              { video_id: 1, video_url: "" },
              { video_id: 2, video_url: "" },
            ],
          },
          completed: true,
        },
        {
          lesson_id: 2,
          title: "Lesson 2",
          description: "Markdown content for Lesson 2...",
          attachements: {
            images: [
              { image_id: 1, image_url: "" },
              { image_id: 2, image_url: "" },
            ],
            videos: [
              { video_id: 1, video_url: "" },
              { video_id: 2, video_url: "" },
            ],
          },
          completed: true,
        },
      ],
      quizzes: [
        {
          quiz_id: 1,
          title: "Quiz for Module 1",
          description: "Quiz description...",
          questions: [
            {
              question_id: 1,
              title: "Question 1",
              description: "Question description...",
              question_type: "Multiple Choice",
              answers: [
                {
                  answer_id: 1,
                  text: "Option A",
                  is_correct: false,
                },
                {
                  answer_id: 2,
                  text: "Option B",
                  is_correct: true,
                },
                {
                  answer_id: 3,
                  text: "Option C",
                  is_correct: false,
                },
              ],
            },
            {
              question_id: 2,
              title: "Question 2",
              description: "Question description...",
              question_type: "True/False",
              answers: [
                {
                  answer_id: 1,
                  text: "True",
                  is_correct: true,
                },
                {
                  answer_id: 2,
                  text: "False",
                  is_correct: false,
                },
              ],
            },
            {
              question_id: 3,
              title: "Question 3",
              description: "Question description...",
              question_type: "Single Choice",
              answers: [
                {
                  answer_id: 1,
                  text: "Option A",
                  is_correct: true,
                },
                {
                  answer_id: 2,
                  text: "Option B",
                  is_correct: false,
                },
                {
                  answer_id: 3,
                  text: "Option C",
                  is_correct: false,
                },
              ],
            },
          ],
        },
      ],
      assignments: [
        {
          assignment_id: 1,
          title: "Assignment for Module 1",
          description: "Assignment description...",
          file_limits: {
            max_files: 3,
            max_file_size: "10MB",
            allowed_file_formats: ["pdf", "docx"],
          },
          deadline: "2023-09-30T23:59:59Z",
        },
      ],
    },
  ],
  progress: {
    completed_lessons: 1, // Number of completed lessons
    total_lessons: 3, // Total number of lessons
    completed_quizzes: 0, // Number of completed quizzes
    total_quizzes: 1, // Total number of quizzes
    completed_assignments: 0, // Number of completed assignments
    total_assignments: 1, // Total number of assignments
  },
};

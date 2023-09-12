import { RiAccountBoxLine, RiDashboardLine, RiExchangeDollarFill, RiHome2Line, RiLoginBoxLine, RiNotificationLine, RiQuestionLine, RiUser3Line, RiVideoAddFill } from "react-icons/ri";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md"
import { PiStudentFill } from "react-icons/pi"
import { TbNewSection } from "react-icons/tb"
import { Link } from "react-router-dom";

export const enrolledCourse = {
  course_id: 1,
  course_uuid: "d996797a-50fb-11ee-be56-0242ac120002",
  title: "Sample Childhood Overweight & Obesity",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  modules: [
    {
      module_id: 1,
      module_uuid: "00cb3b5e-50ff-11ee-be56-0242ac120002",
      title: "Module 1",
      lessons: [
        {
          lesson_id: 1,
          lesson_uuid: "813981cc-50fc-11ee-be56-0242ac120002",
          title: "Adult and Childhood Obesity",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, 
          attachements: {
            images: [
              { image_id: 1, image_uuid: "86946d1c-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/1.jpg" },
              { image_id: 2, image_uuid: "8c27f514-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/2.jpg" },
              { image_id: 3, image_uuid: "8f5ee094-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/3.jpg" },
              { image_id: 4, image_uuid: "9214ce8e-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/4.jpg" },
              { image_id: 5, image_uuid: "94ab82dc-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/5.jpg" },
              { image_id: 6, image_uuid: "97d67d90-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/6.jpg" },
              { image_id: 7, image_uuid: "9b08c4a0-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/7.jpg" },
              { image_id: 8, image_uuid: "9e03c95c-50fc-11ee-be56-0242ac120002", image_url: "/course-attachments/images/8.jpg" },
            ],
            videos: [
              { video_id: 1, video_uuid: "c70e37c4-50fc-11ee-be56-0242ac120002", video_url: "/course-attachments/videos/1.mp4" },
              { video_id: 2, video_uuid: "c9a61d80-50fc-11ee-be56-0242ac120002", video_url: "/course-attachments/videos/2.,p4" },
              { video_id: 3, video_uuid: "cf3e553c-50fc-11ee-be56-0242ac120002", video_url: "/course-attachments/videos/3.mp4" },
            ],
            audios: [
              { audio_id: 1, audio_uuid: "ab1c26a6-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 2, audio_uuid: "b805662a-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 3, audio_uuid: "bbdd303e-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 4, audio_uuid: "c0520c3e-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 5, audio_uuid: "c84c64e8-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 6, audio_uuid: "d3a4e680-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 7, audio_uuid: "d79fb6fc-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
              { audio_id: 8, audio_uuid: "dc1a0714-50fd-11ee-be56-0242ac120002", audio_url: "/course-attachments/audios/1.jpg" },
            ]
          },
          completed: true,
        },
        {
          lesson_id: 2,
          lesson_uuid: "04d71452-50ff-11ee-be56-0242ac120002",
          title: "Definition of Overweight & Obesity",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 3,
          lesson_uuid: "21e46c3e-50ff-11ee-be56-0242ac120002",
          title: "The Stats",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 4,
          lesson_uuid: "283a1c50-50ff-11ee-be56-0242ac120002",
          title: "Obesity",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 5,
          lesson_uuid: "2c703926-50ff-11ee-be56-0242ac120002",
          title: "Health Impact of Obesity: Type-2 Diabetes",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 6,
          lesson_uuid: "307d9c20-50ff-11ee-be56-0242ac120002",
          title: "Diabetes",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 7,
          lesson_uuid: "3581e38e-50ff-11ee-be56-0242ac120002",
          title: "Insulin is a Hormone",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 8,
          lesson_uuid: "3a60f3e0-50ff-11ee-be56-0242ac120002",
          title: "Types of Diabetes: Type 1",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 9,
          lesson_uuid: "414191ec-50ff-11ee-be56-0242ac120002",
          title: "Types of Diabetes: Type-2",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 10,
          lesson_uuid: "45bc66ca-50ff-11ee-be56-0242ac120002",
          title: "Monogenic Diabetes or MODY",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 11,
          lesson_uuid: "4a7bd77c-50ff-11ee-be56-0242ac120002",
          title: "Health Impact of Obesity: Type-2 Diabetes",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 12,
          lesson_uuid: "4f776660-50ff-11ee-be56-0242ac120002",
          title: "Financial Implications",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 13,
          lesson_uuid: "537964b6-50ff-11ee-be56-0242ac120002",
          title: "OMG!",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
        {
          lesson_id: 14,
          lesson_uuid: "5865eaf8-50ff-11ee-be56-0242ac120002",
          title: "Identifying Children at High Risk",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          completed: true,
        },
      ],
      quizzes: [
        {
          quiz_id: 1,
          quiz_uuid: "c35d167e-50ff-11ee-be56-0242ac120002",
          title: "Quiz for Module 1",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
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
          assignment_uuid: "cd59ecc4-50ff-11ee-be56-0242ac120002",
          title: "Assignment for Module 1",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
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

export const sidebarContent = [
  { id: 1, route: "/", icon: <RiHome2Line size={24} />, title: "Home" },
  { id: 2, route: "/auth/dashboard", icon: <RiDashboardLine size={24} />, title: "Dashboard" },
  { id: 3, route: "/auth/profile", icon: <RiUser3Line size={24} />, title: "My Profile" },
  { id: 4, route: "/auth/my-courses", icon: <RiVideoAddFill size={24} />, title: "My Courses", count: 3 },
  { id: 4, route: "/auth/enrolled-course/1", icon: <RiVideoAddFill size={24} />, title: "Enrolled Courses" },
  { id: 5, route: "/auth/announcements", icon: <RiNotificationLine size={24} />, title: "Announcements" },
  { id: 6, route: "/auth/earnings", icon: <RiExchangeDollarFill size={24} />, title: "Withdrawals" },
  { id: 7, route: "/auth/submissions", icon: <RiQuestionLine size={24} />, title: "Quiz Attempts" },
  { id: 8, route: "/auth/assignments", icon: <MdOutlineAssignmentTurnedIn size={24} />, title: "Assignments" },
  { id: 9, route: "/auth/student-submissions", icon: <PiStudentFill size={24} />, title: "My Students" },
  { id: 10, route: "/auth/account-settings", icon: <RiAccountBoxLine size={24} />, title: "Account Settings" },
  { id: 11, route: "/login", icon: <RiLoginBoxLine size={24} />, title: "Login" },
  { id: 12, route: "/register", icon: <TbNewSection size={24} />, title: "Register" },
]

export const notificationDropdownItems = [
  { id: 1, label: <Link to="/auth/dashboard">1st Menu Item</Link> },
  { id: 2, label: <Link to="/auth/dashboard">2nd Menu Item</Link> },
  { id: 3, label: <Link to="/auth/dashboard">3rd Menu Item</Link> },
  { id: 4, label: <Link to="/auth/dashboard">4th Menu Item</Link> },
]
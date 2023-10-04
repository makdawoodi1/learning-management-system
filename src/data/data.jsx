import { RiAccountBoxLine, RiDashboardLine, RiExchangeDollarFill, RiHome2Line, RiLoginBoxLine, RiLogoutBoxRLine, RiNotificationLine, RiQuestionLine, RiUser3Line, RiVideoAddFill, RiVideoAddLine, RiVidiconLine } from "react-icons/ri";
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

// const items = [
//   getItem("Childhood Overweight & Obesity", "id1", [
//     getItem(
//       "Lessons",
//       "lessonGroup",
//       [
//         getItem("OAdult and Childhood Obesity", "1"),
//         getItem("Definition of Overweight & Obesity", "2"),
//         getItem("The Stats", "3"),
//         getItem("Obesity", "4"),
//         getItem("Health Impact of Obesity: Type-2 Diabetes.", "5"),
//         getItem("Diabetes", "6"),
//       ],
//       "group"
//     ),
//     // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//     getItem(
//       "Assignments",
//       "assignmentGroup",
//       [getItem("Assignment 1", "assignment1")],
//       "group"
//     ),
//     getItem("Quizzes", "quizGroup", [getItem("Quiz 1", "quiz1")], "group"),
//   ]),
//   getItem("Childhood Overweight & Obesity", "sub2", [
//     getItem(
//       "Lessons",
//       "lessonGroup",
//       [
//         getItem("OAdult and Childhood Obesity", "1"),
//         getItem("Definition of Overweight & Obesity", "2"),
//         getItem("The Stats", "3"),
//         getItem("Obesity", "4"),
//         getItem("Health Impact of Obesity: Type-2 Diabetes.", "5"),
//         getItem("Diabetes", "6"),
//       ],
//       "group"
//     ),
//     // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//     getItem(
//       "Assignments",
//       "assignmentGroup",
//       [getItem("Assignment 1", "assignment1")],
//       "group"
//     ),
//     getItem("Quizzes", "quizGroup", [getItem("Quiz 1", "quiz1")], "group"),
//   ]),
//   {
//     type: "divider",
//   },
// ];

export const studentSidebarContent = [
  { id: 1, route: "/", icon: <RiHome2Line size={24} />, title: "Home" },
  { id: 2, route: "/auth/dashboard", icon: <RiDashboardLine size={24} />, title: "Dashboard" },
  { id: 3, route: "/auth/profile", icon: <RiUser3Line size={24} />, title: "My Profile" },
  { id: 5, route: "/auth/enrolled-courses", icon: <RiVidiconLine size={24} />, title: "Enrolled Courses", count: 3 },
  { id: 6, route: "/auth/student-announcements", icon: <RiNotificationLine size={24} />, title: "Announcements" },
  { id: 8, route: "/auth/quiz-attempts", icon: <RiQuestionLine size={24} />, title: "Quiz Attempts" },
]

export const adminSidebarContent = [
  { id: 1, route: "/", icon: <RiHome2Line size={24} />, title: "Home" },
  { id: 2, route: "/auth/dashboard", icon: <RiDashboardLine size={24} />, title: "Dashboard" },
  { id: 3, route: "/auth/profile", icon: <RiUser3Line size={24} />, title: "My Profile" },
  { id: 4, route: "/auth/my-courses", icon: <RiVideoAddLine size={24} />, title: "My Courses", count: 3 },
  { id: 6, route: "/auth/announcements", icon: <RiNotificationLine size={24} />, title: "Announcements" },
  { id: 7, route: "/auth/student-quiz-attempts", icon: <RiNotificationLine size={12} className="align-middle me-1" />, title: "Student Quiz Attempts" },
  { id: 8, route: "/auth/earnings", icon: <RiExchangeDollarFill size={24} />, title: "Withdrawals" },
]

export const notificationDropdownItems = [
  { id: 1, label: <Link to="/auth/dashboard">1st Menu Item</Link> },
  { id: 2, label: <Link to="/auth/dashboard">2nd Menu Item</Link> },
  { id: 3, label: <Link to="/auth/dashboard">3rd Menu Item</Link> },
  { id: 4, label: <Link to="/auth/dashboard">4th Menu Item</Link> },
]

export const adminProfileMenuItems = [
  { id: 1, route: "/auth/profile", icon: <RiUser3Line size={12} className="align-middle me-1" />, title: "My Profile" },
  { id: 2, route: "/auth/my-courses", icon: <RiVidiconLine size={12} className="align-middle me-1" />, title: "My Courses" },
  { id: 3, route: "/auth/add-course", icon: <RiVideoAddLine size={12} className="align-middle me-1" />, title: "Create new course" },
  { id: 4, route: "/auth/student-quiz-attempts", icon: <RiNotificationLine size={12} className="align-middle me-1" />, title: "Student Quiz Attempts" },
  { id: 5, route: "/auth/announcements", icon: <RiNotificationLine size={12} className="align-middle me-1" />, title: "Announcements" },
  { id: 6, route: "/auth/logout", icon: <RiLogoutBoxRLine size={12} className="align-middle me-1 text-danger" />, title: "Logout" },
]

export const studentProfileMenuItems = [
  { id: 1, route: "/auth/profile", icon: <RiUser3Line size={12} className="align-middle me-1" />, title: "My Profile" },
  { id: 2, route: "/auth/enrolled-courses", icon: <RiVidiconLine size={12} className="align-middle me-1" />, title: "Enrolled Courses" },
  { id: 3, route: "/auth/quiz-attempts", icon: <RiQuestionLine size={12} className="align-middle me-1" />, title: "My Quiz Attempts" },
  { id: 4, route: "/auth/student-announcements", icon: <RiNotificationLine size={12} className="align-middle me-1" />, title: "Quiz Attempts" },
  { id: 5, route: "/auth/logout", icon: <RiLogoutBoxRLine size={12} className="align-middle me-1 text-danger" />, title: "Logout" },
]
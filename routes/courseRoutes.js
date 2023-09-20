import express from "express";
import { 
    getCoursesHandler,
    getCourseHandler,
    createCourseHandler,
    updateCourseHandler,
    enrollCourseHandler,
    getEnrolledCoursesHandler,
    getEnrolledCourseHandler,
    getCourseContent,
    contentHandler
} from "../controllers/courseController.js";

import { 
    presignURLHandler, 
    delteObjectHandler,
 } from "../controllers/utils/s3.js"

const router = express.Router();

router.post("/get-presign-url", async (req, res, next) => {
    const { 
        name, 
        folderKey, 
        moduleKey,
        lessonKey
    } = req.body.data.attributes;
    await presignURLHandler(req, res, name, folderKey, moduleKey, lessonKey);
});

router.delete("/delete-object", async (req, res, next) => {
    await delteObjectHandler(req, res);
});

router.get("/get-courses", async (req, res, next) => {
    await getCoursesHandler(req, res);
});

router.get("/get-course", async (req, res, next) => {
    const { username, courseID } = req.query;
    await getCourseHandler(req, res, username, courseID);
});

router.get("/get-enrolled-courses", async (req, res, next) => {
    const { username } = req.query;
    await getEnrolledCoursesHandler(req, res, username);
});

router.get("/get-enrolled-course", async (req, res, next) => {
    const { courseID } = req.query;
    await getEnrolledCourseHandler(req, res, courseID);
})

router.get("/get-content", async (req, res, next) => {
    const { contentObject } = req.query;
    await getCourseContent(req, res, contentObject);
})

router.put("/mark-complete", async (req, res, next) => {
    const { contentObject } = req.query;
    await contentHandler(req, res, contentObject);
})

router.post("/create-course", async (req, res, next) => {
    await createCourseHandler(req, res);
})

router.post("/enroll-course", async (req, res, next) => {
    const { courseID } = req.query;
    await enrollCourseHandler(req, res, courseID);
})

router.put("/edit-course", async (req, res, next) => {
    const { courseID } = req.query;
    await updateCourseHandler(req, res, courseID);
})

export default router;
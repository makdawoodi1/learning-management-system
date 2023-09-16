import express from "express";
import { 
    getCoursesHandler,
    getCourseHandler,
    createCourseHandler,
    updateCourseHandler
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

router.get("/get-courses/:courseID", async (req, res, next) => {
    const { courseID } = req.query;
    await getCourseHandler(req, res, courseID);
});

router.post("/create-course", async (req, res, next) => {
    await createCourseHandler(req, res);
})

router.put("/update-course/:courseID", async (req, res, next) => {
    const { courseID } = req.query;
    await updateCourseHandler(req, res, courseID);
})

export default router;
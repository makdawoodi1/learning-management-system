import express from "express";
import { 
    presignURLHandler1, 
    delteObjectHandler,
    getCoursesHandler,
    getCourseHandler,
    createCourseHandler,
    updateCourseHandler
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/get-presign-url", async (req, res, next) => {
    await presignURLHandler1(req, res);
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
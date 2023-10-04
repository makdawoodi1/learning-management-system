import express from "express";

import {
    getAnnouncementsHandler,
    getAnnouncementHandler,
    createAnnouncement,
    editAnnouncementHandler,
    deleteAnnouncementHandler
} from "../controllers/announcementController.js";

const router = express.Router();

router.get("/get-announcements", async (req, res, next) => {
    await getAnnouncementsHandler(req, res);
});

router.get("/get-announcement", async (req, res, next) => {
    await getAnnouncementHandler(req, res);
});

router.post("/create-announcement", async (req, res, next) => {
    await createAnnouncement(req, res);
})

router.post("/edit-announcement", async (req, res, next) => {
    const { annoucementID, courseID } = req.query;
    await editAnnouncementHandler(req, res, annoucementID, courseID);
})

router.delete("/delete-announcement", async (req, res, next) => {
    const { annoucementID, courseID } = req.query;
    await deleteAnnouncementHandler(req, res, annoucementID, courseID);
})

export default router;

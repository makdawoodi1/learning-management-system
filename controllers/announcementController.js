import { PrismaClient } from "@prisma/client";

export const getAnnouncementsHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    let announcements = await prisma.announcement.findMany({
      include: {
        course: true
      },
    });

    if (announcements) {
      res.json({
        success: true,
        message: "Announcements have been successfully fetched!",
        announcements,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getAnnouncementHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    let announcements = await prisma.announcement.findMany({
      include: {
        course: true
      },
      where: {
        active: true
      }
    });

    if (announcements) {
      res.json({
        success: true,
        message: "Announcements have been successfully fetched!",
        announcements,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const {
      announcementTitle,
      announcementContent,
      courseID,
      announcementStatus
    } = req.body.data.attributes;
    const prisma = new PrismaClient();

    // Creating Announcement
    const newAnnouncement = await prisma.announcement.create({
      data: {
        title: announcementTitle,
        content: announcementContent,
        course_id: courseID,
        active: announcementStatus === "Active" ? true : false
      },
    });

    if (newAnnouncement) {
      const announcements = await prisma.announcement.findMany({
        include: {
          course: true
        },
      });

      return res.json({
        success: true,
        announcements,
        message: "The Announcement has been created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const editAnnouncementHandler = async (req, res, annoucementID, courseID) => {
  try {
    const {
      announcementTitle,
      announcementContent,
      announcementStatus
    } = req.body.data.attributes;
    const prisma = new PrismaClient();

    // Creating Announcement
    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: parseInt(annoucementID) },
      data: {
        title: announcementTitle,
        content: announcementContent,
        course_id: parseInt(courseID),
        active: announcementStatus === "Active" ? true : false
      },
    });

    if (updatedAnnouncement) {
      const announcements = await prisma.announcement.findMany({
        include: {
          course: true
        },
      });

      return res.json({
        success: true,
        announcements,
        message: "The Announcement has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  applyJob,
  getMyApplications,
  getApplicants,
} = require("../controllers/jobController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// USER
router.post("/apply/:jobId", verifyToken, applyJob);
router.get("/my/applications", verifyToken, getMyApplications);

// ADMIN ONLY
router.post("/", verifyToken, isAdmin, createJob);
router.delete("/:id", verifyToken, isAdmin, deleteJob);
router.get("/:jobId/applicants", verifyToken, isAdmin, getApplicants);

module.exports = router;

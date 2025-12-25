const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
} = require("../controllers/jobController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// ADMIN ONLY
router.post("/", verifyToken, isAdmin, createJob);
router.delete("/:id", verifyToken, isAdmin, deleteJob);

module.exports = router;

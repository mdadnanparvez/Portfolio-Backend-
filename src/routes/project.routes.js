const express = require("express");
const router = express.Router();
const {
  createProject,
  updateProject,
  getProjects,
  getProjectBySlug,
  deleteProject,
} = require("../config/controllers/project.controller");
const verifyAdmin = require("../middleware/auth.middleware");

router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug);
router.post("/", verifyAdmin, createProject);
router.patch("/:id", verifyAdmin, updateProject);
router.delete("/:id", verifyAdmin, deleteProject);

module.exports = router;
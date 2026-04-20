const Project = require("../../models/Project.model");

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const createUniqueSlug = async (name, providedSlug = "") => {
  let baseSlug = providedSlug?.trim() ? generateSlug(providedSlug) : generateSlug(name);

  if (!baseSlug) {
    baseSlug = `project-${Date.now()}`;
  }

  let finalSlug = baseSlug;
  let counter = 1;

  while (await Project.findOne({ slug: finalSlug })) {
    finalSlug = `${baseSlug}-${counter++}`;
  }

  return finalSlug;
};

const createProject = async (req, res) => {
  try {
    const {
      name,
      slug,
      type,
      shortDescription,
      fullDescription,
      tools,
      coverImage,
      images,
      liveLink,
      githubLink,
      featured,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    const finalSlug = await createUniqueSlug(name, slug);

    const project = await Project.create({
      name: name.trim(),
      slug: finalSlug,
      type: type || "",
      shortDescription: shortDescription || "",
      fullDescription: fullDescription || "",
      tools: Array.isArray(tools) ? tools : [],
      coverImage: coverImage || "",
      images: Array.isArray(images) ? images : [],
      liveLink: liveLink || "",
      githubLink: githubLink || "",
      featured: Boolean(featured),
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create project.",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const {
      name,
      slug,
      type,
      shortDescription,
      fullDescription,
      tools,
      coverImage,
      images,
      liveLink,
      githubLink,
      featured,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    let finalSlug = existingProject.slug;

    const requestedSlug = slug?.trim() ? generateSlug(slug) : generateSlug(name);

    if (requestedSlug !== existingProject.slug) {
      let baseSlug = requestedSlug || generateSlug(name) || `project-${Date.now()}`;
      let candidate = baseSlug;
      let counter = 1;

      while (
        await Project.findOne({
          slug: candidate,
          _id: { $ne: id },
        })
      ) {
        candidate = `${baseSlug}-${counter++}`;
      }

      finalSlug = candidate;
    }

    existingProject.name = name.trim();
    existingProject.slug = finalSlug;
    existingProject.type = type || "";
    existingProject.shortDescription = shortDescription || "";
    existingProject.fullDescription = fullDescription || "";
    existingProject.tools = Array.isArray(tools) ? tools : [];
    existingProject.coverImage = coverImage || "";
    existingProject.images = Array.isArray(images) ? images : [];
    existingProject.liveLink = liveLink || "";
    existingProject.githubLink = githubLink || "";
    existingProject.featured = Boolean(featured);

    await existingProject.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: existingProject,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update project.",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project by slug error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch project.",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete project.",
    });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getProjectBySlug,
  deleteProject,
};
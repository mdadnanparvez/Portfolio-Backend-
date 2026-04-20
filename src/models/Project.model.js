const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    fullDescription: {
      type: String,
      default: "",
    },

    tools: {
      type: [String],
      default: [],
    },

    coverImage: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    liveLink: {
      type: String,
      default: "",
    },

    githubLink: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
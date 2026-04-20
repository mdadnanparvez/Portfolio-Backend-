const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    exam: { type: String, default: "" },
    institute: { type: String, default: "" },
    group: { type: String, default: "" },
    result: { type: String, default: "" },
    year: { type: String, default: "" },
  },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { _id: false }
);

const skillCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    credentialLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: "",
    },
    shortBio: {
      type: String,
      default: "",
    },
    aboutDescription: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    bannerImage: {
      type: String,
      default: "",
    },
    resumeLink: {
      type: String,
      default: "",
    },
    education: {
      ssc: { type: educationSchema, default: () => ({}) },
      hsc: { type: educationSchema, default: () => ({}) },
      bsc: { type: educationSchema, default: () => ({}) },
    },
    socialLinks: {
      type: socialLinkSchema,
      default: () => ({}),
    },
    contactInfo: {
      type: contactSchema,
      default: () => ({}),
    },
    skills: {
      type: [skillCategorySchema],
      default: [],
    },
    certificates: {
      type: [certificateSchema],
      default: [],
    },
    experiences: {
      type: [experienceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
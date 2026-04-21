const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const url = await uploadToCloudinary(req.file.buffer, "portfolio");

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    console.error("Single upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Single upload failed",
    });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    console.log("req.files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const urls = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, "projects"))
    );

    res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error("Multiple upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Multiple upload failed",
    });
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
};
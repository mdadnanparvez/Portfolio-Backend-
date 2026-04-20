const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const uploadSingleImage = async (req, res) => {
  try {
    const url = await uploadToCloudinary(req.file.buffer, "portfolio");

    res.json({
      success: true,
      url,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    const urls = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(file.buffer, "projects")
      )
    );

    res.json({
      success: true,
      urls,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
};
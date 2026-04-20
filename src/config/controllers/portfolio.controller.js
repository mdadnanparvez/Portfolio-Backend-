const Portfolio = require("../../models/Portfolio.model");

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();

    return res.status(200).json({
      success: true,
      data: portfolio || null,
    });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio data.",
    });
  }
};

const upsertPortfolio = async (req, res) => {
  try {
    const {
      name,
      title,
      shortBio,
      aboutDescription,
      profileImage,
      bannerImage,
      resumeLink,
      education,
      socialLinks,
      contactInfo,
      skills,
      certificates,
      experiences,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    let portfolio = await Portfolio.findOne();

    if (portfolio) {
      portfolio.name = name ?? portfolio.name;
      portfolio.title = title ?? "";
      portfolio.shortBio = shortBio ?? "";
      portfolio.aboutDescription = aboutDescription ?? "";
      portfolio.profileImage = profileImage ?? "";
      portfolio.bannerImage = bannerImage ?? "";
      portfolio.resumeLink = resumeLink ?? "";
      portfolio.education = education ?? {};
      portfolio.socialLinks = socialLinks ?? {};
      portfolio.contactInfo = contactInfo ?? {};
      portfolio.skills = Array.isArray(skills) ? skills : [];
      portfolio.certificates = Array.isArray(certificates) ? certificates : [];
      portfolio.experiences = Array.isArray(experiences) ? experiences : [];

      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        name,
        title: title ?? "",
        shortBio: shortBio ?? "",
        aboutDescription: aboutDescription ?? "",
        profileImage: profileImage ?? "",
        bannerImage: bannerImage ?? "",
        resumeLink: resumeLink ?? "",
        education: education ?? {},
        socialLinks: socialLinks ?? {},
        contactInfo: contactInfo ?? {},
        skills: Array.isArray(skills) ? skills : [],
        certificates: Array.isArray(certificates) ? certificates : [],
        experiences: Array.isArray(experiences) ? experiences : [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio saved successfully.",
      data: portfolio,
    });
  } catch (error) {
    console.error("Upsert portfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save portfolio data.",
    });
  }
};

module.exports = {
  getPortfolio,
  upsertPortfolio,
};
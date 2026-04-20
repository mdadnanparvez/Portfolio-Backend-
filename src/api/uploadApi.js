import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/upload/single`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.url;
};

export const uploadMultipleImages = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/upload/multiple`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.urls;
};
// client/src/utils/upload.js
import axios from "axios";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export default upload;
import { useEffect, useState } from "react";
import ResumeForm from "./ResumeForm";
import api from "../../utils/api";
import { uploadFile } from "../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";

export default function EditResume() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile").then((res) => setData(res.data));
  }, []);

  const handleUpdate = async (formData) => {
    const payload = structuredClone(formData);

    if (payload.contact.photo instanceof File) {
      payload.contact.photoUrl = await uploadFile(payload.contact.photo);
    }
    delete payload.contact.photo;

    if (payload.resumeFile instanceof File) {
      payload.resumeFileUrl = await uploadFile(payload.resumeFile);
    }
    delete payload.resumeFile;

    await api.put("/user/profile", payload);
    alert("✅ Updated successfully");
    navigate("/dashboard");
  };

  if (!data) return <p>Loading...</p>;

  return <ResumeForm initialData={data} onSubmit={handleUpdate} />;
}

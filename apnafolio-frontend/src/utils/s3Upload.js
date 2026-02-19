import api from "./api";
export const uploadFile = async (file) => {
  if (!file) return null;

  const { data } = await api.post("/upload/generate-upload-url", {
    fileType: file.type,
    fileSize: file.size,
  });

  await fetch(data.uploadURL, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return data.fileURL;
};

// export const uploadFile = async (file) => {
//   if (!file) return null;

//   const { data } = await api.post("/upload/generate-upload-url", {
//     fileType: file.type,
//     fileSize: file.size, // 🔥 ADD THIS
//   });

//   await fetch(data.uploadURL, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type,
//     },
//     body: file,
//   });

//   return data.fileURL;
// };

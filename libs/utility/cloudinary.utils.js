// export default async function uploadImg(file) {
//   const CLOUD_NAME = "dzdpb7vbb";
//   const UPLOAD_PRESET = "user_imgs";
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
//   console.log("uploadImg file", file);

//   try {
//     const formData = new FormData();
//     formData.append("upload_preset", UPLOAD_PRESET);
//     formData.append("file", file);

//     const res = await fetch(UPLOAD_URL, {
//       method: "POST",
//       body: formData,
//     });
//     const response = await res.json();
//     console.log("uploadImg res.json()", response);
//     return response;
//   } catch (err) {
//     console.error("Failed to upload", err);
//     throw err;
//   }
// }

// //check how to save the url without save file.

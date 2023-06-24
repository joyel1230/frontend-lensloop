export const uplaodToCloudinary = async (croppedImg,preset) => {
  try {
    const responseFetch = await fetch(croppedImg);
    const blob = await responseFetch.blob();
    const file = new File([blob], "filename.png", { type: blob.type });
    const dataImg = new FormData();
    dataImg.append("file", file);
    dataImg.append("upload_preset", preset);
    dataImg.append("cloud_name", "dzkyvaivw");
    const resp =await fetch(
      "https://api.cloudinary.com/v1_1/dzkyvaivw/image/upload",
      {
        method: "post",
        body: dataImg,
      }
    );
    const data1 = await resp.json();
    return data1
  } catch (error) {
    console.log(error);
  }
};

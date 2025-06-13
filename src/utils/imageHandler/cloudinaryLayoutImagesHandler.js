import cloudinary from "@/lib/cloudinary";

export const uploadImageToCloudinary = async (
  image,
  preset = "default_preset"
) => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          upload_preset: preset,
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(buffer);
  });

  return response;
};

export const deleteImageFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw new Error("Failed to delete images.");
  }
};

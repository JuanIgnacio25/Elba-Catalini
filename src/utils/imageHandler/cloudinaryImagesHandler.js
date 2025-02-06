import cloudinary from "@/libs/cloudinary";

export const uploadImagesToCloudinary = async (images) => {
  const uploadPromises = images.map(async (image) => {

    const fileName = image.name.split(".").slice(0, -1).join(".");
    
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir la imagen a Cloudinary con las transformaciones
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "product_images_preset",
            public_id: fileName, // Usa el nombre del archivo sin extensión
            overwrite: true, // Sobrescribe si ya existe
            unique_filename: false, // Mantiene el nombre original
            transformation: [
              {
                width: 485,
                height: 485,
                crop: "pad",
                aspect_ratio: "1:1",
                background: "white",
              },
              {
                quality: "auto", // Optimiza la calidad según el dispositivo
                fetch_format: "auto", // Optimiza el formato de la imagen automáticamente
              },
            ],
          },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    return response;
  });

  const uploadResults = await Promise.all(uploadPromises);

  return uploadResults;
};

export const deleteImagesFromCloudinary = async (images) => {
  if (!images || images.length === 0) {
    return { message: "El producto no tiene imagenes." };
  }

  try {
    const deletePromises = images.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );

    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    throw new Error("Failed to delete images.");
  }
};

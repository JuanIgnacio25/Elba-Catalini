import cloudinary from "@/libs/cloudinary";

// Subir a Cloudinary las imágenes 1 por 1 y luego devolver un objeto con las respuestas de cada imagen
export const uploadImagesToCloudinary = async (images) => {
  const uploadPromises = images.map(async (image) => {
    // Convertir el archivo a un buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir la imagen a Cloudinary con las transformaciones
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "product_images_preset",
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

  // Esperar a que todas las imágenes se suban
  const uploadResults = await Promise.all(uploadPromises);

  return uploadResults;
};

export const deleteImagesFromCloudinary = async (imageIds) => {
  if (!imageIds || imageIds.length === 0) {
    return { message: "No images to delete." };
  }

  try {
    const deletePromises = imageIds.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );

    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    throw new Error("Failed to delete images.");
  }
};
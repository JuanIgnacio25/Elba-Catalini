import cloudinary from "@/libs/cloudinary";

//subir a cloudinary las imagenes 1 por 1 y luego devolver un objeto con las 2 repuestas de cada imagen
const uploadImagesToCloudinary = async (images) => {
  const uploadPromises = images.map(async (image) => {
    // Convertir el archivo a un buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir la imagen a Cloudinary
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({
          upload_preset:"product_images_preset",
        }, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        })
        .end(buffer);
    });

    return response;
  });

  // Esperar a que todas las imágenes se suban
  const uploadResults = await Promise.all(uploadPromises);

  return uploadResults;
};


export default uploadImagesToCloudinary;
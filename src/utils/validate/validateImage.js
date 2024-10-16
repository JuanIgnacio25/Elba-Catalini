
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3 MB

export const validateImage = (images) => {
  const errors = [];

  if (images.length === 0) {
    errors.push("No se han proporcionado imágenes.");
    return errors;
  }

  images.forEach((image) => {
    if (!(image instanceof File)) {
      errors.push(`${image.name} no es un archivo válido.`);
      return;
    }

    if (image.size > MAX_IMAGE_SIZE) {
      errors.push(`${image.name} excede el tamaño máximo de 3 MB.`);
    }
  });

  return errors;
};

export default validateImage;
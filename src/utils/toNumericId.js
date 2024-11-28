const toNumericId = (id) => {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error("ID de producto no válido");
  return numericId;
}

export default toNumericId
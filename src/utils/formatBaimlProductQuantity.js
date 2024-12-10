export const formatBaimlProductQuantityLabel = (
  productCategory,
  productSku,
  productKind
) => {
  if (productKind === "Baiml") {
    switch (productCategory) {
      case "Lentes de Repuesto":
      case "Repuestos":
        return "Paquete";

      case "Soportes":
      case "Reflectores":
      case "Accesorios":
      case "Soportes electrónicos":
        if (productSku.startsWith("2500E")) return "Blister";

        // Validaciones para "300E" y "660/"
        if (/^300E[ID]$/.test(productSku) || /^660\/.+$/.test(productSku)) {
          return "Caja";
        }

        return "Bolsa";
      case "Traseros electrónicos":
        if (productSku.startsWith("KIT1600E")) {
          return "Bolsa";
        }

      default:
        return "Caja";
    }
  } else {
    return "Cantidad";
  }
};

export const formatBaimlProductSetLabel = (productSet, productUnit) => {
  if (productSet)
    return `(${productSet} ${productSet > 1 ? "juegos" : "juego"} de ${
      productUnit / productSet
    } unidades)`;
  return null;
};

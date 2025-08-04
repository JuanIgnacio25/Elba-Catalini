const orderProductsForOrders = (products) => {
  const baimlLateCategories = [
    "Lentes de repuestos",
    "Soportes",
    "Reflectivos",
    "Repuestos",
  ];

  const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
      const val = item[key] || "Sin valor";
      acc[val] = acc[val] || [];
      acc[val].push(item);
      return acc;
    }, {});

  // Separar productos por marca
  const baiml = products.filter((p) => p.kind === "Baiml");
  const store = products.filter((p) => p.kind === "Store");

  // Electrónicos Baiml
  const baimlElectronics = baiml.filter(
    (p) => p.isElectronic && p.category !== "Soportes electrónicos"
  );

  // Soportes electrónicos al final de todos los electrónicos
  const baimlElectronicsSupport = baiml.filter(
    (p) => p.isElectronic && p.category === "Soportes electrónicos"
  );

  // No electrónicos
  const baimlNonElectronics = baiml.filter((p) => !p.isElectronic);

  // Separar no-electrónicos en temprano y tardío
  const baimlLate = baimlNonElectronics.filter((p) =>
    baimlLateCategories.includes(p.category)
  );
  const baimlEarly = baimlNonElectronics.filter(
    (p) => !baimlLateCategories.includes(p.category)
  );

  // Agrupar
  const baimlElectronicsGrouped = groupBy(baimlElectronics, "category");
  const baimlEarlyGrouped = groupBy(baimlEarly, "category");
  const baimlLateOrdered = baimlLateCategories.flatMap((cat) =>
    baimlLate.filter((p) => p.category === cat)
  );

  // Store ordenado por categoría > subCategoría > variantSubCategory
  const storeGroupedByCategory = groupBy(store, "category");

  const storeOrdered = Object.entries(storeGroupedByCategory).flatMap(
    ([category, items]) => {
      const groupedBySub = groupBy(items, "subCategory");

      return Object.entries(groupedBySub).flatMap(([subCategory, subItems]) => {
        const groupedByVariant = groupBy(subItems, "variantSubCategory");

        return Object.values(groupedByVariant).flat();
      });
    }
  );

  // Resultado final
  const ordered = [
    ...Object.values(baimlElectronicsGrouped).flat(),
    ...baimlElectronicsSupport, // Soportes electrónicos al final de los electrónicos
    ...Object.values(baimlEarlyGrouped).flat(),
    ...baimlLateOrdered,
    ...storeOrdered,
  ];
  
  return ordered;
};

export default orderProductsForOrders;

const formatStoreProductUnit = (subCategory, unit) => {

  const categories = ["Cable TPR","Caño Corrugado Abierto","Tubo Termocontraible","Cinta Helicoidal","Spaghetti PVC"];

  if(categories.includes(subCategory)){
    return `${unit} mts`;
  }else{
    return unit;
  }
}

export default formatStoreProductUnit;
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import SaleDialogButton from "./SaleDialogButton";
import SaleTableSkeleton from "./SaleTableSkeleton";

function SaleTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [saleImage, setSaleImage] = useState();

  const hadleChangeImage = (newSaleImageUrl) => {
    setSaleImage(newSaleImageUrl);
  };

  const fetchSaleImage = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/layoutImages/saleImage");
      setSaleImage(res.data.image.secure_url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSaleImage();
  }, []);

  return (
    <div className="flex justify-center mt-[12vh] mb-10">
      <div className="container flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 md:gap-0 mx-auto py-6 md:py-10 px-2 sm:px-0">
        <h2 className="text-3xl font-bold">Imagen del pop up</h2>
        {isLoading ? (
          <SaleTableSkeleton />
        ) : (
          <>
            <div className="relative w-full max-w-xs lg:max-w-lg aspect-video overflow-hidden rounded-md">
              <Image
                src={saleImage}
                alt="Imagen del popup"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
            <SaleDialogButton
              saleImage={saleImage}
              handleChangeImage={hadleChangeImage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SaleTable;

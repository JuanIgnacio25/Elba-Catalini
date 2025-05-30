"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MdKeyboardArrowDown } from "react-icons/md";
import BusinessInfoDetails from "./BusinessInfoDetails";

const BusinessCard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[90%] md:w-[80%] mx-auto mt-8 bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      {/* Encabezado del componente */}
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-6 cursor-pointer">
          <div className="flex items-center space-x-3">
            <MdKeyboardArrowDown
              className={`h-6 w-6 text-red-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className={`text-lg font-semibold text-gray-600 ${isOpen ? "text-red-500" : ""}`}>
              Casa Central
            </span>
          </div>
        </div>
      </CollapsibleTrigger>

      {/* Contenido desplegable */}
      <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="border-t border-gray-200">
          <BusinessInfoDetails />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BusinessCard;

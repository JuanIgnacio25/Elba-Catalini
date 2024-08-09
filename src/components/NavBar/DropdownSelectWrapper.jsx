"use client";

import React, { Suspense, useEffect, useState } from "react";

import DropdownSelectFallback from "@/components/Fallbacks/DropdownSelectFallback";

const DropdownSelect = React.lazy(() => import('@/components/NavBar/DropdownSelect'));

const DropdownSelectWrapper = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Suspense fallback={DropdownSelectFallback}>
      {isLoaded ? <DropdownSelect /> : <DropdownSelectFallback/>}
    </Suspense>
  );
};

export default DropdownSelectWrapper;
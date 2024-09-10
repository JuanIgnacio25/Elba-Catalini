import { Suspense } from "react";
import dynamic from "next/dynamic";

import DropdownSelectFallback from "@/components/Fallbacks/DropdownSelectFallback";

const DropdownSelect = dynamic(
  () => import("@/components/NavBar/DropdownSelect"),
  { ssr: false, loading: () => <DropdownSelectFallback /> }
);

const DropdownSelectWrapper = () => {
  return (
    <Suspense fallback={<DropdownSelectFallback />}>
      <DropdownSelect />
    </Suspense>
  );
};

export default DropdownSelectWrapper;

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

function SaleTableSkeleton() {
  return (
    <>
      <div className="relative w-full max-w-xs lg:max-w-lg aspect-video overflow-hidden rounded-md">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      <Button> <MdEdit/>Cambiar Imagen</Button>
    </>
  );
}

export default SaleTableSkeleton;

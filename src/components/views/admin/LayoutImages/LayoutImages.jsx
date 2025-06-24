import BrandsTable from "@/components/views/admin/LayoutImages/Brands/BrandsTable";
import NewsTable from "@/components/views/admin/LayoutImages/News/NewsTable";
import SaleTable from "@/components/views/admin/LayoutImages/Sale/SaleTable"

function LayoutImages() {
  return (
    <div>
      <SaleTable />
      <BrandsTable/>
      <NewsTable/>
    </div>
  );
}

export default LayoutImages;

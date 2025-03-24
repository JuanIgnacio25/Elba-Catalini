import { Suspense } from "react";

import AdminProductTableFallback from "@/components/Fallbacks/AdminProductTableFallback";

import DashboardProductForm from "@/components/views/admin/DashboardProductForm";
import DashboardProductsTable from "@/components/views/admin/DashboardProductsTable";
import DashboardUsersTable from "@/components/views/admin/DashboardUsersTable";

function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center my-8">
      <Suspense fallback={<AdminProductTableFallback />}>
        <DashboardProductsTable />
      </Suspense>
      <DashboardProductForm />
      <DashboardUsersTable />
    </div>
  );
}

export default Dashboard;

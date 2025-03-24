import DashboardProductForm from "@/components/views/admin/DashboardProductForm";
import DashboardProductsTable from "@/components/views/admin/DashboardProductsTable";
/* import DashboardUsersTable from "@/components/views/admin/DashboardUsersTable"; */

function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center my-8">
      <DashboardProductsTable/>
      <DashboardProductForm/>
      {/* <DashboardUsersTable/> */}
    </div>
  )
}

export default Dashboard
import { Suspense } from "react"

import DashboardUsersTable from "@/components/views/admin/DashboardUsersTable"
import AdminUserTableFallback from "@/components/Fallbacks/AdminUserTableFallback"

function UsersPage() {
  return (
    <Suspense fallback={<AdminUserTableFallback />}>
      <DashboardUsersTable/>
    </Suspense>
  )
}

export default UsersPage
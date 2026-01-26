import { requireAuth } from "@/lib/auth-utils";
import DashboardPage from "@/modules/presentation/dashboard/dashboard-page";

const DashboardPageMain = async () => {
  await requireAuth();
  return <DashboardPage />;
};

export default DashboardPageMain;

import { LayoutPropsMain } from "@/config/types";
import { auth } from "@/lib/auth";
import DashboardLayout from "@/modules/layouts/dashboard-layout";
import { headers } from "next/headers";

const DashboardLayoutMain = async ({ children }: LayoutPropsMain) => {
  const session = await auth.api.getSession({ headers: await headers() });
  /* if (!session) {
    redirect(routes.login);
  } */
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutMain;

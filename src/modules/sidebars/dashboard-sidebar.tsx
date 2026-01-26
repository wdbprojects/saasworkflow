import { Sidebar } from "@/components/ui/sidebar";
import { ISidebarProps } from "@/config/types";
import DashboardSidebarContent from "@/modules/components/sidebar/dashboard-sidebar-content";

const DashboardSidebar = ({ user }: ISidebarProps) => {
  return (
    <Sidebar
      className="z-40 rounded-sm border-none pt-15"
      variant="floating"
      collapsible="icon"
    >
      <DashboardSidebarContent user={user} />
    </Sidebar>
  );
};

export default DashboardSidebar;

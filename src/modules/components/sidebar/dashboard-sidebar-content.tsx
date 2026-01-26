import {
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ISidebarProps } from "@/config/types";
import NavMain from "@/modules/components/sidebar/nav-main";
import NavUser from "@/modules/components/sidebar/nav-user";

const DashboardSidebarContent = ({ user }: ISidebarProps) => {
  return (
    <>
      {/* <SidebarHeader>Sidebar Header</SidebarHeader> */}
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </>
  );
};

export default DashboardSidebarContent;

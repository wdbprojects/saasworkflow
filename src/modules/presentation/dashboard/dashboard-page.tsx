import TestingTRPCSuspense from "@/modules/components/home/testing-trcp-suspense";
import TestingTRPCClient from "@/modules/components/home/testing-trpc-client";
import TestingTRPCServer from "@/modules/components/home/testing-trpc-server";

const DashboardPage = async () => {
  return (
    <div className="space-y-4">
      {/* <div>
        <h2 className="text-primary text-2xl font-semibold">Admin Dashboard</h2>
        <h3 className="text-xl">Users - Server</h3>
        <TestingTRPCServer />
      </div> */}
      {/*  <div>
        <h3 className="text-xl">Users - Client</h3>
        <TestingTRPCClient />
      </div> */}
      <div>
        <h3 className="text-xl">Users - Ideal Solution</h3>
        <TestingTRPCSuspense />
      </div>
    </div>
  );
};
export default DashboardPage;

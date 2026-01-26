import { caller } from "@/trpc/server";

const TestingTRPCServer = async () => {
  const users = await caller.getUsers();

  return <code>{JSON.stringify(users)}</code>;
};

export default TestingTRPCServer;

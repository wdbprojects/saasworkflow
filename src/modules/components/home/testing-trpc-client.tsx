"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const TestingTRPCClient = () => {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return <code>{JSON.stringify(users)}</code>;
};

export default TestingTRPCClient;

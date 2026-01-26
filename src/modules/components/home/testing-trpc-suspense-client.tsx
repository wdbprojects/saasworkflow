"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const TestingTRPCSuspenseClient = () => {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return <code>{JSON.stringify(users, null, 2)}</code>;
};

export default TestingTRPCSuspenseClient;

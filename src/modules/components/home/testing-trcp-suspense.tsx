import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TestingTRPCSuspenseClient from "./testing-trpc-suspense-client";

const TestingTRPCSuspense = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className="flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={"Loading..."}>
          <TestingTRPCSuspenseClient />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default TestingTRPCSuspense;

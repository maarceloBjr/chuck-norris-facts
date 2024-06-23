import { Loading } from "@/components/custom/Loading";
import { SelectCategory } from "@/components/custom/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NetworkStatus, gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function JokePage() {
  const router = useRouter();

  const JOKE_QUERY = gql`
    query {
      randomJoke {
        value
      }
    }
  `;

  const { data, error, loading, refetch, networkStatus } = useQuery(
    JOKE_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) return <Loading />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl text-center text-black">
        Random Chuck Norris Fact
      </h1>
      <div className="w-5/6 h-80">
        <h1 className="text-2xl text-center text-black mt-12">
          {data.randomJoke.value}
        </h1>
      </div>
      <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
        <Button
          variant="secondary"
          onClick={() => {
            router.back();
            refetch();
          }}
        >
          Go back
        </Button>
        <Button onClick={() => refetch()}>New random joke</Button>
      </div>
    </main>
  );
}

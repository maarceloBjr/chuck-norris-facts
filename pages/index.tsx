import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div>
        <h1 className="text-4xl text-center text-black">
          Chuck Norris doesn't welcome you.
        </h1>
        <h1 className="text-4xl text-center text-black">
          You welcome Chuck Norris.
        </h1>
      </div>

        <h1 className="text-2xl text-center text-black">
          What type of joke are you looking for?
        </h1>
      <div className='grid-cols-3 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4'>
        <Button onClick={() => router.push('/joke')}>Random</Button>
        <Button>By category</Button>
        <Button>Free search</Button>
      </div>
    </main>
  );
}

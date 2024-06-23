import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=''>
        <h1 className="text-4xl text-center text-black">
          Chuck Norris doesn't welcome you.
        </h1>
        <h1 className="text-4xl text-center text-black">
          You welcome Chuck Norris.
        </h1>
        <h1 className="text-2xl text-center text-black mt-10">
          This website will show you who Chuck Norris really is.
        </h1>
      </div>

      <div className="flex-1 mt-52">
        <h1 className="text-2xl text-center text-black">
          What type of fact are you looking for?
        </h1>
        <div className="grid-cols-3 grid mb-32 lg:max-w-full mt-12 space-x-4">
          <Button onClick={() => router.push("/randomJoke", "/fact")}>
            Random
          </Button>
          <Button onClick={() => router.push("/categoryJoke", "/fact")}>
            By category
          </Button>
          <Button onClick={() => router.push("/searchJoke", "/fact")}>
            Free search
          </Button>
        </div>
      </div>
    </main>
  );
}

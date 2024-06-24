import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-2">
      <div className="">
        <h1 className="sm:text-4xl text-center max-sm:text-2xl">
          Chuck Norris does not welcome you.
        </h1>
        <h1 className="sm:text-4xl text-center max-sm:text-2xl">You welcome Chuck Norris.</h1>
        <h1 className="sm:text-2xl text-center mt-10 max-sm:text-lg">
          This website will show you who Chuck Norris really is.
        </h1>
      </div>

      <div className="flex-1 mt-52 max-sm:w-10/12">
        <h1 className="sm:text-2xl text-center max-sm:text-lg">
          What type of fact are you looking for?
        </h1>
        <div className="grid-cols-3 grid mb-32 max-w-full mt-12 max-lg:space-x-1 justify-items-center">
          <Button onClick={() => router.push("/randomJoke")} className="max-lg:text-xs max-lg:w-10/12 lg:w-28" >Random</Button>
          <Button onClick={() => router.push("/categoryJoke")} className="max-lg:text-xs max-lg:w-10/12 lg:w-28">
            By category
          </Button>
          <Button onClick={() => router.push("/searchJoke")} className="max-lg:text-xs max-lg:w-10/12 lg:w-28">
            Free search
          </Button>
        </div>
      </div>
    </main>
  );
}

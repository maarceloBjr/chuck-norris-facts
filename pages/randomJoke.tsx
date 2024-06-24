import { Error } from "@/components/custom/Error";
import { Loading } from "@/components/custom/Loading";
import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function RandomJoke() {
  const router = useRouter();

  const JOKE_QUERY = gql`
    query {
      randomJoke {
        value
      }
    }
  `;

  const { data, error, loading, refetch } = useQuery(JOKE_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loading />;

  if (error) return <Error errorMessage={error.message} refetch={refetch} />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-2">
      <h1 className="sm:text-4xl text-center max-sm:text-2xl">
        Random Chuck Norris Fact
      </h1>
      <div className="w-5/6 h-80">
        <h1 className="sm:text-2xl text-center mt-12 max-sm:text-xl">
          {data.randomJoke.value}
        </h1>
      </div>
      <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 space-x-4">
        <Button
          variant="secondary"
          onClick={() => {
            router.back();
            refetch();
          }}
          className="max-sm:min-w-40"
        >
          Go back
        </Button>
        <Button onClick={() => refetch()} className="max-sm:min-w-40">New random joke</Button>
      </div>
    </main>
  );
}

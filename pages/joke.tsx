import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";


export default function JokePage() {
  const router = useRouter();
  const randomJokeQuery = gql`
    query {
      randomJoke {
        icon_url
        id
        url
        value
      }
    }
  `;

  const { data, error, loading, refetch } = useQuery(randomJokeQuery);

    if (loading) return null;
  

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <h1 className="text-2xl text-center text-black">
        {data.randomJoke.value}
        </h1>
      <div className='grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4'>
        <Button onClick={() => {router.back(); refetch()}}>Go back</Button>
        <Button onClick={() => refetch()}>New random joke</Button>
      </div>
    </main>
  );
}

import { Loading } from "@/components/custom/Loading";
import { SelectCategory } from "@/components/custom/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NetworkStatus, gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function JokePage() {
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);
  const [lastJoke, setLastJoke] = useState("");
  const [query, setQuery] = useState("");
  const [searchedJokes, setSearchedJokes] = useState([]);

  const router = useRouter();

  const SEARCH_JOKE_QUERY = gql`
    query searchJokes($query: String!) {
      searchJokes(query: $query) {
        value
      }
    }
  `;

  const [searchJoke, { data, loading, refetch, called }] =
    useLazyQuery(SEARCH_JOKE_QUERY);

  if (loading) return <Loading />;

  const handleFirstClickSearch = () => {
    searchJoke({ variables: { query } });
    setClicked(true);
  };

  const handleMoreClicksSearch = async () => {
    await refetch({ query });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl text-center text-black">
        Type a word to search for a joke
      </h1>
      <Input
        placeholder="Type a word"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="bg-secondary w-1/3"
      />
      <div className="w-5/6 h-80 overflow-y-auto p-4 scrollbar-custom rounded-md">
        {clicked &&
          called &&
          data &&
          data.searchJokes.map((e: any, index: number) => (
            <h1 key={index} className="text-sm text-center text-black my-2">
              {e.value}
            </h1>
          ))}
      </div>
      <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
        <Button
          variant="secondary"
          onClick={() => {
            setClicked(false);
            router.back();
            // categoryRefetch();
          }}
        >
          Go back
        </Button>
        <Button
          onClick={() => {
            clicked ? handleMoreClicksSearch() : handleFirstClickSearch();
          }}
        >
          Search
        </Button>
      </div>
    </main>
  );
}

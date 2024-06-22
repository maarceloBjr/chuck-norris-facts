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

  const JOKE_QUERY = gql`
    query {
      randomJoke {
        value
      }
      allCategories
    }
  `;

  const CATEGORY_JOKE_QUERY = gql`
    query searchByCategory($category: String!) {
      searchByCategory(category: $category) {
        value
      }
    }
  `;

  const SEARCH_JOKE_QUERY = gql`
    query searchJokes($query: String!) {
      searchJokes(query: $query) {
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

  const [
    fetchCategoryJokes,
    {
      data: categoryData,
      loading: categoryLoading,
      error: categoryError,
      refetch: categoryRefetch,
      called,
    },
  ] = useLazyQuery(CATEGORY_JOKE_QUERY);

  const [
    searchJoke,
    {
      data: searchData,
      loading: searchLoading,
      refetch: refetchSearch,
      called: searchCalled,
    },
  ] = useLazyQuery(SEARCH_JOKE_QUERY);

  useEffect(() => {
    if (categoryData) {
      if (lastJoke !== categoryData.searchByCategory.value) {
        setLastJoke(categoryData.searchByCategory.value);
      } else {
        categoryRefetch({ category });
      }
    }
  }, [called, categoryData]);

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";

  if (loading || categoryLoading) return <p>Loading...</p>;
  if (called && categoryLoading) return <p>Loading ...</p>;

  if (error || categoryError)
    return <p>Error: {(error || categoryError)?.message}</p>;

  const handleFirstClick = () => {
    fetchCategoryJokes({ variables: { category } });
    setClicked(true);
  };

  const handleMoreClicks = async () => {
    await categoryRefetch({ category });
  };

  const handleFirstClickSearch = () => {
    searchJoke({ variables: { query } });
    setClicked(true);
  };

  const handleMoreClicksSearch = async () => {
    await refetchSearch({ query });
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      {router.query.type === "random" && (
        <>
          <h1 className="text-2xl text-center text-black">
            {data.randomJoke.value}
          </h1>
          <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
            <Button
              onClick={() => {
                router.back();
                refetch();
              }}
            >
              Go back
            </Button>
            <Button onClick={() => refetch()}>New random joke</Button>
          </div>
        </>
      )}

      {router.query.type === "category" && (
        <>
          <h1 className="text-2xl text-center text-black">
            Select the category you want to see a joke from
          </h1>
          <SelectCategory
            allCategories={data.allCategories}
            placeholder="Select a category"
            onValueChange={(value: string) => {
              setCategory(value);
            }}
            value={category}
          />
          {clicked && (
            <h1 className="text-2xl text-center text-black">{lastJoke}</h1>
          )}
          <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
            <Button
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
                clicked ? handleMoreClicks() : handleFirstClick();
              }}
            >
              {clicked ? "New joke" : "Get joke"}
            </Button>
          </div>
        </>
      )}

      {router.query.type === "search" && (
        <>
          <h1 className="text-2xl text-center text-black">
            Type a word to search for a joke
          </h1>
          <Input
            placeholder="Type a word"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div className="w-5/6 h-80 overflow-y-auto p-4 scrollbar-custom rounded-md">
            {clicked &&
              searchCalled && searchData && searchData.searchJokes.map((e: any, index: number) => (
                <h1 key={index} className="text-sm text-center text-black my-2">
                  {e.value}
                </h1>
              ))
              }
          </div>
          <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
            <Button
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
        </>
      )}
    </main>
  );
}

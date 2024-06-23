import { Loading } from "@/components/custom/Loading";
import { SelectCategory } from "@/components/custom/Select";
import { Button } from "@/components/ui/button";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CategoryJoke() {
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);
  const [lastJoke, setLastJoke] = useState("");

  const router = useRouter();

  const JOKE_QUERY = gql`
    query {
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

  const { data, error, loading } = useQuery(JOKE_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

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

  useEffect(() => {
    if (categoryData) {
      if (lastJoke !== categoryData.searchByCategory.value) {
        setLastJoke(categoryData.searchByCategory.value);
      } else {
        categoryRefetch({ category });
      }
    }
  }, [called, categoryData]);

  if (loading || categoryLoading) return <Loading />;
  if (called && categoryLoading) return <Loading />;

  const handleFirstClick = () => {
    fetchCategoryJokes({ variables: { category } });
    setClicked(true);
  };

  const handleMoreClicks = () => {
    categoryRefetch({ category });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl text-center text-black">
        Select the category you want to see a joke from
      </h1>
      <SelectCategory
        allCategories={data.allCategories}
        placeholder="Category"
        onValueChange={(value: string) => {
          setCategory(value);
        }}
        value={category}
      />
      <div className="w-5/6 h-80">
        {clicked && categoryData && called ? (
          <h1 className="text-2xl text-center text-black">{lastJoke}</h1>
        ) : (
          <h1 className="text-2xl text-center">
            {categoryError?.graphQLErrors[0].message}
          </h1>
        )}
      </div>
      <div className="grid-cols-2 grid mb-32 lg:max-w-96 lg:w-96 mb-0 space-x-4">
        <Button
          variant="secondary"
          onClick={() => {
            setClicked(false);
            router.back();
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
    </main>
  );
}

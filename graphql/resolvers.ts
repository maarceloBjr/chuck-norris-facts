import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    randomJoke: async () => {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      return data;
    },
    searchJokes: async (_: any, { query }: { query: string }) => {
      if (!query || query.length < 3) {
        throw new GraphQLError('Chuck Norris needs you to provide at least 3 letters!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const res = await fetch(
        `https://api.chucknorris.io/jokes/search?query=${query}`
      );
      const data = await res.json();
      return data.result;
    },
    allCategories: async () => {
      const res = await fetch("https://api.chucknorris.io/jokes/categories");
      const data = await res.json();
      return data;
    },
    searchByCategory: async (_: any, { category }: { category: string }) => {
      if (!category || category.length < 1) {
        throw new GraphQLError('Chuck Norris needs you to provide a category!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const res = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      const data = await res.json();
      return data;
    },
  },
};

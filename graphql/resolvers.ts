export const resolvers = {
    Query: {
        randomJoke: async () => {
            const res = await fetch('https://api.chucknorris.io/jokes/random');
            const data = await res.json();
            return data;
        },
        searchJokes: async (_, { query }: { query: string }) => {
            if (query === null) {
                throw new Error("Chuck Norris needs you to provide at least one letter!");
            }
            const res = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
            const data = await res.json();
            return data.result;
        },
        allCategories: async () => {
            const res = await fetch('https://api.chucknorris.io/jokes/categories');
            const data = await res.json();
            return data;
        },
        searchByCategory: async (_, { category }: { category: string }) => {
            if (category === null) {
                throw new Error("Chuck Norris needs you to provide a category!");
            }
            const res = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
            const data = await res.json();
            return data;
        },
    }
}
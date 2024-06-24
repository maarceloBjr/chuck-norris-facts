import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://chuck-norris-facts-five.vercel.app/api/graphql",
    cache: new InMemoryCache(),
});

export default apolloClient;
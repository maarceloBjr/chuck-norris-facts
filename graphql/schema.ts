import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Joke {
    icon_url: String
    id: String
    url: String
    value: String
  }

  type Query {
    joke: Joke
  }
`;

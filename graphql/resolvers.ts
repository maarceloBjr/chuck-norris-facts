export const resolvers = {
    Query: {
        joke: () => {
            return fetch('https://api.chucknorris.io/jokes/random')
                .then(res => res.json())
                .then(data => data);
        }
    }
}
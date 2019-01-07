import { ApolloCache } from 'apollo-cache';

interface Resolvers {
  Mutation: {
    [name: string]: (rootValue: { }, args: any, context: { cache: ApolloCache<any> }) => any,
  };
}

export const defaults = {
  after: null,
  before: null,
};

export const resolvers: Resolvers = {
  Mutation: {
    nextPage: (_, { cursor }, { cache }) => {
      cache.writeData({ data: { after: cursor, before: null } });
      return cursor;
    },
    prevPage: (_, { cursor }, { cache }) => {
      cache.writeData({ data: { after: null, before: cursor } });
      return cursor;
    },
  },
};

import { ApolloCache } from 'apollo-cache';
import gql from 'graphql-tag';

interface Resolvers {
  Mutation: {
    [name: string]: (rootValue: { }, args: any, context: { cache: ApolloCache<any> }) => any,
  };
}

export const defaults = {
  current: null,
  stack: [],
};

export const resolvers: Resolvers = {
  Mutation: {
    nextPage: (_, { cursor }, { cache }) => {
      const { stack }  = cache.readQuery({ query: gql`query PagingStack { stack @client }` });
      const newStack = [...stack, cursor];
      cache.writeData({ data: { current: cursor, stack: newStack } });
      return cursor;
    },
    prevPage: (_, { cursor }, { cache }) => {
      const { stack }  = cache.readQuery({ query: gql`query PagingStack { stack @client }` });
      stack.pop();
      const current = stack[stack.length - 1] || null;
      cache.writeData({ data: { current, stack } });
      return current;
    },
  },
};

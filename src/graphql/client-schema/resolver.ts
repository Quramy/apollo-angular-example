export const defaults = {
  nextCursor: null,
};

export const resolvers = {
  Mutation: {
    nextPage: (_, { cursor }, { cache }) => {
      cache.writeData({ data: { nextCursor: cursor } });
      return cursor;
    },
  },
};

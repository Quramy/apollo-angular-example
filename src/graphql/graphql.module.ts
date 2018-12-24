import {NgModule} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ClientStateConfig, withClientState } from 'apollo-link-state';
import { getGhToken } from './functions/get-gh-token';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {
  const token = getGhToken();
  const headers = new HttpHeaders().append('Authorization', `bearer ${token}`);
  const cache = new InMemoryCache();
  const stateLink = withClientState({
    cache,
    resolvers: {
      Query: {
        hoge: async () => {
          return 'hoge';
        },
      },
    },
  });
  return {
    link: ApolloLink.from([
      stateLink,
      httpLink.create({
        uri,
        headers,
      }),
    ]),
    cache,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

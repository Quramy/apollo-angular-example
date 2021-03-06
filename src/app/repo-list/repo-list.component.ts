import { Component, Input } from '@angular/core';
import gql from 'graphql-tag';
import { RepoItemComponent } from '../repo-item/repo-item.component';
import { RepoList } from './__generated__/RepoList';
import { Apollo } from 'apollo-angular';

// FIXME
// A fragment should not know how variables are defined in Query.
const fragment = gql`
  ${RepoItemComponent.fragment}
  fragment RepoList on User {
    repositories(first: $first, after: $after) {
      nodes {
        ...RepoItem,
      },
      pageInfo {
        hasPreviousPage,
        hasNextPage,
        endCursor,
        startCursor,
      },
      totalCount,
    }
  }
`;

const nextPage = gql`
  mutation nextPage($cursor: String) {
    nextPage(cursor: $cursor) @client
  }
`;

const prevPage = gql`
  mutation prevPage($cursor: String) {
    prevPage(cursor: $cursor) @client
  }
`;

@Component({
  selector: 'app-repo-list',
  styleUrls: ['./repo-list.component.css'],
  template: `
    <div *ngIf="repoList.repositories && repoList.repositories.nodes as repositories">
      <app-simple-pager
        [hasPrev]="repoList.repositories.pageInfo.hasPreviousPage"
        [hasNext]="repoList.repositories.pageInfo.hasNextPage"
        (prev)="prev()"
        (next)="next()"
      ></app-simple-pager>
      <app-repo-item
        class="item"
        *ngFor="let node of repositories"
        [repoItem]="node"
      ></app-repo-item>
      <app-simple-pager
        [hasPrev]="repoList.repositories.pageInfo.hasPreviousPage"
        [hasNext]="repoList.repositories.pageInfo.hasNextPage"
        (prev)="prev()"
        (next)="next()"
      ></app-simple-pager>
    </div>
  `,
})
export class RepoListComponent {
  static fragment = fragment;
  @Input() repoList: RepoList;

  constructor(private apollo: Apollo) {
  }

  prev() {
    this.apollo.mutate({
      mutation: prevPage,
      variables: {
        cursor: this.repoList.repositories.pageInfo.startCursor,
      }
    }).subscribe();
  }

  next() {
    this.apollo.mutate({
      mutation: nextPage,
      variables: {
        cursor: this.repoList.repositories.pageInfo.endCursor,
      }
    }).subscribe();
  }
}

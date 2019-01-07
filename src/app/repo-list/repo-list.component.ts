import { Component, Input } from '@angular/core';
import gql from 'graphql-tag'
import { RepoItemComponent } from '../repo-item/repo-item.component';
import { RepoList } from './__generated__/RepoList';
import { Apollo } from 'apollo-angular';

const fragment = gql`
  ${RepoItemComponent.fragment}
  fragment RepoList on User {
    repositories(first: $first, after: $after) {
      nodes {
        ...RepoItem,
      },
      pageInfo {
        hasNextPage,
        endCursor,
        startCursor,
      },
      totalCount,
    }
  }
`

const nextPage = gql`
  mutation nextPage($cursor: String) {
    nextPage(cursor: $cursor) @client
  }
`

@Component({
  selector: 'app-repo-list',
  styleUrls: ['./repo-list.component.css'],
  template: `
    <div *ngIf="fragment.repositories && fragment.repositories.nodes as repositories">
      <app-repo-item
        class="item"
        *ngFor="let node of repositories"
        [fragment]="node"
      ></app-repo-item>
      <div>
        <span (click)="next()">next</span>
      </div>
    </div>
  `,
})
export class RepoListComponent {
  static fragment = fragment;
  @Input() fragment: RepoList;

  constructor(private apollo: Apollo) {
  }

  next() {
    this.apollo.mutate({
      mutation: nextPage,
      variables: {
        cursor: this.fragment.repositories.pageInfo.endCursor,
      }
    }).subscribe();
  }
}

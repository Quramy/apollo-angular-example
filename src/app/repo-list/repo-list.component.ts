import { Component, Input } from '@angular/core';
import gql from 'graphql-tag'
import { RepoItemComponent } from '../repo-item/repo-item.component';
import { RepoList } from './__generated__/RepoList';

const fragment = gql`
  ${RepoItemComponent.fragment}
  fragment RepoList on User {
    repositories(last: $last) {
      nodes {
        ...RepoItem,
      }
    }
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
    </div>
  `,
})
export class RepoListComponent {
  static fragment = fragment;
  @Input() fragment: RepoList;
}

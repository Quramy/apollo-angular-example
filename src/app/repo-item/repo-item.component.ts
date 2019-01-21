import { Component, Input } from '@angular/core';
import gql from 'graphql-tag';
import { RepoItem } from './__generated__/RepoItem'

const fragment = gql`
  fragment RepoItem on Repository {
    id,
    name,
    url,
    description,
    languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
      nodes { id, name }
    }
  }
`;

@Component({
  selector: 'app-repo-item',
  styleUrls: ['./repo-item.component.css'],
  template: `
    <section>
      <header class="title">
        <a [href]="repoItem.url" targe="_blank">
          {{repoItem.name}}
        </a>
      </header>
      <p class="desc" *ngIf="repoItem.description">{{repoItem.description}}</p>
      <p class="desc" *ngIf="!repoItem.description">(no description)</p>
      <ul class="langs" *ngIf="repoItem.languages.nodes">
        <li class="lang-label" *ngFor="let lang of repoItem.languages.nodes">
          {{lang.name}}
        </li>
      </ul>
    </section>
  `,
})
export class RepoItemComponent {
  static fragment = fragment;
  @Input() repoItem: RepoItem;
}

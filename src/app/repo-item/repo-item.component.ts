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
        <a [href]="fragment.url" targe="_blank">
          {{fragment.name}}
        </a>
      </header>
      <p class="desc" *ngIf="fragment.description">{{fragment.description}}</p>
      <p class="desc" *ngIf="!fragment.description">(no description)</p>
      <ul class="langs" *ngIf="fragment.languages.nodes">
        <li class="lang-label" *ngFor="let lang of fragment.languages.nodes">
          {{lang.name}}
        </li>
      </ul>
    </section>
  `,
})
export class RepoItemComponent {
  static fragment = fragment;
  @Input() fragment: RepoItem;
}

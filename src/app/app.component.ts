import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import  gql from 'graphql-tag';
import { AppQuery } from './__generated__/AppQuery'
import { NextCursor } from './__generated__/NextCursor'
import { RepoListComponent } from './repo-list/repo-list.component';

const nextCursor = gql`
  query NextCursor {
    nextCursor @client
  }
`;

const appQuery = gql`
  ${RepoListComponent.fragment}
  query AppQuery($first: Int!, $after: String) {
  	viewer {
      ...RepoList,
    },
  }
`;

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="container">
    <h1>
      Your GitHub repositories
    </h1>
    <div *ngIf="data$ | async as data">
      <app-repo-list [fragment]="data.viewer"></app-repo-list>
    </div>
  </div>
  `,
})
export class AppComponent implements OnInit {
  data$: Observable<AppQuery>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data$ = this.apollo.watchQuery<NextCursor>({
      query: nextCursor,
    }).valueChanges.pipe(
      switchMap(x => this.apollo.watchQuery<AppQuery>({
        query: appQuery,
        variables: { first: 20, after: x.data.nextCursor },
      }).valueChanges)
    ).pipe(map(x => x.data));
  }
}

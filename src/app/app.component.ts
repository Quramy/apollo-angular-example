import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { AppQuery } from './__generated__/AppQuery';
import { Cursors } from './__generated__/Cursors';
import { RepoListComponent } from './repo-list/repo-list.component';

const cursorsQuery = gql`
  query Cursors {
    current @client
  }
`;

const appQuery = gql`
  ${RepoListComponent.fragment}
  query AppQuery($first: Int!, $after: String, $before: String) {
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
    this.data$ = this.apollo.watchQuery<Cursors>({
      query: cursorsQuery,
    }).valueChanges.pipe(
      tap(x => console.log(x)),
      switchMap(x => this.apollo.watchQuery<AppQuery>({
        query: appQuery,
        variables: { first: 20, after: x.data.current },
      }).valueChanges)
    ).pipe(map(x => x.data));
  }
}

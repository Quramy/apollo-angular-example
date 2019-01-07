import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from '../graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RepoItemComponent } from './repo-item/repo-item.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { SimplePagerComponent } from './simple-pager/simple-pager.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoItemComponent,
    RepoListComponent,
    SimplePagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

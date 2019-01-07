/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RepoList
// ====================================================

export interface RepoList_repositories_nodes_languages_nodes {
  __typename: "Language";
  id: string;
  /**
   * The name of the current language.
   */
  name: string;
}

export interface RepoList_repositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (RepoList_repositories_nodes_languages_nodes | null)[] | null;
}

export interface RepoList_repositories_nodes {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * A list containing a breakdown of the language composition of the repository.
   */
  languages: RepoList_repositories_nodes_languages | null;
}

export interface RepoList_repositories_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface RepoList_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (RepoList_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: RepoList_repositories_pageInfo;
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface RepoList {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: RepoList_repositories;
}

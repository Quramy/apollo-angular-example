/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppQuery
// ====================================================

export interface AppQuery_viewer_repositories_nodes_languages_nodes {
  __typename: "Language";
  id: string;
  /**
   * The name of the current language.
   */
  name: string;
}

export interface AppQuery_viewer_repositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (AppQuery_viewer_repositories_nodes_languages_nodes | null)[] | null;
}

export interface AppQuery_viewer_repositories_nodes {
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
  languages: AppQuery_viewer_repositories_nodes_languages | null;
}

export interface AppQuery_viewer_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (AppQuery_viewer_repositories_nodes | null)[] | null;
}

export interface AppQuery_viewer {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: AppQuery_viewer_repositories;
}

export interface AppQuery {
  /**
   * The currently authenticated user.
   */
  viewer: AppQuery_viewer;
}

export interface AppQueryVariables {
  last?: number | null;
}

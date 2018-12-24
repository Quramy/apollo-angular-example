/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RepoItem
// ====================================================

export interface RepoItem_languages_nodes {
  __typename: "Language";
  id: string;
  /**
   * The name of the current language.
   */
  name: string;
}

export interface RepoItem_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (RepoItem_languages_nodes | null)[] | null;
}

export interface RepoItem {
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
  languages: RepoItem_languages | null;
}

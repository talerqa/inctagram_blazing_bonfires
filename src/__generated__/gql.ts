/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n": types.LoginAdminDocument,
    "\n  fragment AvatarsFragment on Avatar {\n    url\n    width\n    height\n    fileSize\n  }\n": types.AvatarsFragmentFragmentDoc,
    "\n  fragment ProfileFragment on Profile {\n    id\n    userName\n    firstName\n    lastName\n    city\n    dateOfBirth\n    aboutMe\n    createdAt\n    avatars {\n      ...AvatarsFragment\n    }\n  }\n  \n": types.ProfileFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n    id\n    userName\n    email\n    createdAt\n    profile {\n      ...ProfileFragment\n    }\n    userBan {\n       reason\n       createdAt\n    }\n  }\n  \n": types.UserFragmentFragmentDoc,
    "\n  query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection, searchTerm: $searchTerm, statusFilter: $statusFilter) {\n    users {\n      id,\n      userName,\n      email,\n      createdAt,\n      profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n      userBan {\n        reason, createdAt\n      } \n    },\n    pagination {pagesCount, page, pageSize, totalCount}\n  }\n}\n": types.GetUsersDocument,
    "\n  mutation BanUser($banReason: String!, $userId: Int!) {\n  banUser(banReason: $banReason, userId: $userId)\n}\n  ": types.BanUserDocument,
    "\n  mutation UnbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n}\n  ": types.UnbanUserDocument,
    "\n  mutation DeleteUser($userId: Int!) {\n    removeUser(userId: $userId)\n}\n  ": types.DeleteUserDocument,
    "\n  fragment ProfileImagesFragment on ImagePost {\n    id,\n    createdAt,\n    url,\n    width\n    height\n    fileSize\n  }\n": types.ProfileImagesFragmentFragmentDoc,
    "\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId){\n    pagesCount,\n    pageSize,\n    totalCount,\n    items {...ProfileImagesFragment} \n  }\n}\n  ": types.GetPostsByUserDocument,
    "\n  query GetUser($userId: Int!) {\n  getUser(userId: $userId){\n    id,\n    userName,\n    email,\n    createdAt,\n    profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n    userBan { reason, createdAt } \n  }\n}\n  ": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n"): (typeof documents)["\n  mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AvatarsFragment on Avatar {\n    url\n    width\n    height\n    fileSize\n  }\n"): (typeof documents)["\n  fragment AvatarsFragment on Avatar {\n    url\n    width\n    height\n    fileSize\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProfileFragment on Profile {\n    id\n    userName\n    firstName\n    lastName\n    city\n    dateOfBirth\n    aboutMe\n    createdAt\n    avatars {\n      ...AvatarsFragment\n    }\n  }\n  \n"): (typeof documents)["\n  fragment ProfileFragment on Profile {\n    id\n    userName\n    firstName\n    lastName\n    city\n    dateOfBirth\n    aboutMe\n    createdAt\n    avatars {\n      ...AvatarsFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFragment on User {\n    id\n    userName\n    email\n    createdAt\n    profile {\n      ...ProfileFragment\n    }\n    userBan {\n       reason\n       createdAt\n    }\n  }\n  \n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    userName\n    email\n    createdAt\n    profile {\n      ...ProfileFragment\n    }\n    userBan {\n       reason\n       createdAt\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection, searchTerm: $searchTerm, statusFilter: $statusFilter) {\n    users {\n      id,\n      userName,\n      email,\n      createdAt,\n      profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n      userBan {\n        reason, createdAt\n      } \n    },\n    pagination {pagesCount, page, pageSize, totalCount}\n  }\n}\n"): (typeof documents)["\n  query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection, searchTerm: $searchTerm, statusFilter: $statusFilter) {\n    users {\n      id,\n      userName,\n      email,\n      createdAt,\n      profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n      userBan {\n        reason, createdAt\n      } \n    },\n    pagination {pagesCount, page, pageSize, totalCount}\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation BanUser($banReason: String!, $userId: Int!) {\n  banUser(banReason: $banReason, userId: $userId)\n}\n  "): (typeof documents)["\n  mutation BanUser($banReason: String!, $userId: Int!) {\n  banUser(banReason: $banReason, userId: $userId)\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UnbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n}\n  "): (typeof documents)["\n  mutation UnbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($userId: Int!) {\n    removeUser(userId: $userId)\n}\n  "): (typeof documents)["\n  mutation DeleteUser($userId: Int!) {\n    removeUser(userId: $userId)\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProfileImagesFragment on ImagePost {\n    id,\n    createdAt,\n    url,\n    width\n    height\n    fileSize\n  }\n"): (typeof documents)["\n  fragment ProfileImagesFragment on ImagePost {\n    id,\n    createdAt,\n    url,\n    width\n    height\n    fileSize\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId){\n    pagesCount,\n    pageSize,\n    totalCount,\n    items {...ProfileImagesFragment} \n  }\n}\n  "): (typeof documents)["\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId){\n    pagesCount,\n    pageSize,\n    totalCount,\n    items {...ProfileImagesFragment} \n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser($userId: Int!) {\n  getUser(userId: $userId){\n    id,\n    userName,\n    email,\n    createdAt,\n    profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n    userBan { reason, createdAt } \n  }\n}\n  "): (typeof documents)["\n  query GetUser($userId: Int!) {\n  getUser(userId: $userId){\n    id,\n    userName,\n    email,\n    createdAt,\n    profile {\n        id, \n        userName,\n        firstName,\n        lastName,\n        city,\n        dateOfBirth,\n        aboutMe, \n        createdAt, \n        avatars {\n        \turl, width, height, fileSize \n        }\n      },\n    userBan { reason, createdAt } \n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
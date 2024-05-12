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
    "\n  query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection){\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id,\n      businessAccountId,\n      status,\n      dateOfPayment,\n      startDate,\n      endDate,\n      type,\n      price,\n      paymentType,\n      payments {\n          id,\n          userId,\n          paymentMethod,\n          amount,\n          currency,\n          createdAt,\n          endDate,\n          type\n        }\n     }\n  }\n}\n  ": types.GetPaymentsByUserDocument,
    "\n  query GetSubscriptionPayments(\n    $pageSize: Int = 10\n  $pageNumber: Int = 1\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n  ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n          userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n  ": types.GetSubscriptionPaymentsDocument,
    "\n  query GetFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowing(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n": types.GetFollowingDocument,
    "\n  query GetFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowers(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n": types.GetFollowersDocument,
    "\n  query GetPosts(\n  $endCursorPostId: Int\n  $searchTerm: String\n  $pageSize: Int = 10\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  ) {\n    getPosts(endCursorPostId:$endCursorPostId, searchTerm: $searchTerm, pageSize: $pageSize, sortBy:$sortBy, sortDirection: $sortDirection) {\n      pagesCount,\n        pageSize,\n        totalCount,\n        items {\n          images { id, createdAt, url, width, height, fileSize }\n          id\n          ownerId\n          description\n          createdAt\n          updatedAt\n          postOwner { id, userName, firstName, lastName, avatars { url, width, height, fileSize } }\n      }\n    }\n  }": types.GetPostsDocument,
    "query GetPostsByUserAdmin(\n  $userId: Int = 1\n  $endCursorId: Int = 1\n) {\n  getPostsByUser(userId:$userId, endCursorId: $endCursorId) {\n    pagesCount,\n      pageSize,\n      totalCount,\n      items {\n      id\n      url\n      width\n      height\n      createdAt\n      fileSize\n    }\n  }\n}": types.GetPostsByUserAdminDocument,
    "\n  subscription GetPostsSubscription {\n    postAdded {\n      images {\n        id\n        createdAt\n        url\n        width\n        height\n        fileSize\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n": types.GetPostsSubscriptionDocument,
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
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection){\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id,\n      businessAccountId,\n      status,\n      dateOfPayment,\n      startDate,\n      endDate,\n      type,\n      price,\n      paymentType,\n      payments {\n          id,\n          userId,\n          paymentMethod,\n          amount,\n          currency,\n          createdAt,\n          endDate,\n          type\n        }\n     }\n  }\n}\n  "): (typeof documents)["\n  query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection){\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id,\n      businessAccountId,\n      status,\n      dateOfPayment,\n      startDate,\n      endDate,\n      type,\n      price,\n      paymentType,\n      payments {\n          id,\n          userId,\n          paymentMethod,\n          amount,\n          currency,\n          createdAt,\n          endDate,\n          type\n        }\n     }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSubscriptionPayments(\n    $pageSize: Int = 10\n  $pageNumber: Int = 1\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n  ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n          userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n  "): (typeof documents)["\n  query GetSubscriptionPayments(\n    $pageSize: Int = 10\n  $pageNumber: Int = 1\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n  ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n          userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowing(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"): (typeof documents)["\n  query GetFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowing(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowers(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"): (typeof documents)["\n  query GetFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n    getFollowers(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection) {\n    pagesCount,\n    page,\n    pageSize,\n    totalCount,\n    items {\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts(\n  $endCursorPostId: Int\n  $searchTerm: String\n  $pageSize: Int = 10\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  ) {\n    getPosts(endCursorPostId:$endCursorPostId, searchTerm: $searchTerm, pageSize: $pageSize, sortBy:$sortBy, sortDirection: $sortDirection) {\n      pagesCount,\n        pageSize,\n        totalCount,\n        items {\n          images { id, createdAt, url, width, height, fileSize }\n          id\n          ownerId\n          description\n          createdAt\n          updatedAt\n          postOwner { id, userName, firstName, lastName, avatars { url, width, height, fileSize } }\n      }\n    }\n  }"): (typeof documents)["\n  query GetPosts(\n  $endCursorPostId: Int\n  $searchTerm: String\n  $pageSize: Int = 10\n  $sortBy: String = \"createdAt\"\n  $sortDirection: SortDirection = desc\n  ) {\n    getPosts(endCursorPostId:$endCursorPostId, searchTerm: $searchTerm, pageSize: $pageSize, sortBy:$sortBy, sortDirection: $sortDirection) {\n      pagesCount,\n        pageSize,\n        totalCount,\n        items {\n          images { id, createdAt, url, width, height, fileSize }\n          id\n          ownerId\n          description\n          createdAt\n          updatedAt\n          postOwner { id, userName, firstName, lastName, avatars { url, width, height, fileSize } }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPostsByUserAdmin(\n  $userId: Int = 1\n  $endCursorId: Int = 1\n) {\n  getPostsByUser(userId:$userId, endCursorId: $endCursorId) {\n    pagesCount,\n      pageSize,\n      totalCount,\n      items {\n      id\n      url\n      width\n      height\n      createdAt\n      fileSize\n    }\n  }\n}"): (typeof documents)["query GetPostsByUserAdmin(\n  $userId: Int = 1\n  $endCursorId: Int = 1\n) {\n  getPostsByUser(userId:$userId, endCursorId: $endCursorId) {\n    pagesCount,\n      pageSize,\n      totalCount,\n      items {\n      id\n      url\n      width\n      height\n      createdAt\n      fileSize\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription GetPostsSubscription {\n    postAdded {\n      images {\n        id\n        createdAt\n        url\n        width\n        height\n        fileSize\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription GetPostsSubscription {\n    postAdded {\n      images {\n        id\n        createdAt\n        url\n        width\n        height\n        fileSize\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
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
    "\n    query GetAllCategories {\n      getAllCategories {\n        id\n        name\n        slug\n      }\n    }\n  ": types.GetAllCategoriesDocument,
    "mutation CreateProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $shipping: Boolean!, $category: String!, $imageUrls: [String!]!) {\n    createProduct(name: $name, description: $description, price: $price, quantity: $quantity, shipping: $shipping, category: $category, imageUrls: $imageUrls) {\n      category\n      description\n      id\n      images\n      name\n      price\n      quantity\n      shipping\n      slug\n    }\n  }\n  ": types.CreateProductDocument,
    "\nmutation AddCategory($name: String!) {\n    addCategory(name: $name) {\n      id\n      name\n      slug\n    }\n  }\n  ": types.AddCategoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllCategories {\n      getAllCategories {\n        id\n        name\n        slug\n      }\n    }\n  "): (typeof documents)["\n    query GetAllCategories {\n      getAllCategories {\n        id\n        name\n        slug\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $shipping: Boolean!, $category: String!, $imageUrls: [String!]!) {\n    createProduct(name: $name, description: $description, price: $price, quantity: $quantity, shipping: $shipping, category: $category, imageUrls: $imageUrls) {\n      category\n      description\n      id\n      images\n      name\n      price\n      quantity\n      shipping\n      slug\n    }\n  }\n  "): (typeof documents)["mutation CreateProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $shipping: Boolean!, $category: String!, $imageUrls: [String!]!) {\n    createProduct(name: $name, description: $description, price: $price, quantity: $quantity, shipping: $shipping, category: $category, imageUrls: $imageUrls) {\n      category\n      description\n      id\n      images\n      name\n      price\n      quantity\n      shipping\n      slug\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation AddCategory($name: String!) {\n    addCategory(name: $name) {\n      id\n      name\n      slug\n    }\n  }\n  "): (typeof documents)["\nmutation AddCategory($name: String!) {\n    addCategory(name: $name) {\n      id\n      name\n      slug\n    }\n  }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
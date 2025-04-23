import { gql } from '@apollo/client';

export const REGISTER_CREATE_USER = gql`
  mutation PublishUser($id: ID!) {
    publishAuthUser(where: { id: $id }) {
      id
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUser($email: String!) {
    authUser(where: { email: $email }) {
      id
      email
      password
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserId($id: ID!) {
    authUser(where: { id: $id }) {
      id
      email
      password
      name
      avatar {
        id
      }
      transitions {
        id
        amount
        createdAt
        date
        note
        type
      }
      categories {
        id
        name
        type
        updatedAt
        publishedAt
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: AuthUserCreateInput!) {
    createAuthUser(data: $data) {
      id
    }
  }
`;

export const GET_AUTH_USERS = gql`
  query GetAuthUsers {
    authUsers {
      id
    }
  }
`;

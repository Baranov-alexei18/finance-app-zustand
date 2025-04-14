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

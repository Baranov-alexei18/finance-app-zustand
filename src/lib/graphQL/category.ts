import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
    }
  }
`;

export const REGISTER_CREATE_CATEGORY = gql`
  mutation PublishCategory($id: ID!) {
    publishCategory(where: { id: $id }) {
      id
    }
  }
`;

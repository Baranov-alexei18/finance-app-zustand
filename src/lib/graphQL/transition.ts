import { gql } from '@apollo/client';

export const CREATE_TRANSITION = gql`
  mutation createTransition($data: TransitionCreateInput!) {
    createTransition(data: $data) {
      id
    }
  }
`;

export const REGISTER_CREATE_TRANSITION = gql`
  mutation PublishTransition($id: ID!) {
    publishTransition(where: { id: $id }) {
      id
    }
  }
`;

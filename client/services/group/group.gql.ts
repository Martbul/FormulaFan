import { gql } from "@apollo/client";

// export const CREATE_GROUP_MUTATION = gql`
//   mutation createGroup($username: String!, $email: String!) {
//     createGroup(createGroupInput: { username: $username, email: $email }) {
//       id
//       name
//       imageUrl
//       # creator{
//       #   username
//       # }
//       members {
//         role
//       }
//       channels {
//         name
//       }
//     }
//   }
// `;


// export const QUERY_GROUP_BY_ID = gql`
//   query getGroupById($id: String!) {
//     singleGroup(id: $id) {
//       name
//     }
//   }
// `;

// export const QUERY_ALL_GROUPS = gql`
//   query getAllGroups {
//     allGroups {
//       id
//       name
//       imageUrl
//       members{
//         id
//       }
//     }
//   }
// `;
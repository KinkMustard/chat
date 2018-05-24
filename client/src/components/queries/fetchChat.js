import gql from "graphql-tag";

export default gql`
  query ChatQuery() {
    chat() {
      name
      description
      messages {
        color
        message
        sender
        time
      }
    }
  }
`;

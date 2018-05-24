import gql from "graphql-tag";

export default gql`
  {
    chats {
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

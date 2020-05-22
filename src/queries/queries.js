import { gql } from "apollo-boost";

export const getTasksQuery = gql`
  {
    tasks {
      description
      date
      id
    }
  }
`;

export const getUsersQuery = gql`
  {
    users {
      username
      password
    }
  }
`;

export const getUsersTasksQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      username
      tasks {
        id
        description
        date
      }
    }
  }
`;

export const getUserQuery = gql`
  query($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      username
      password
      tasks {
        description
        date
        id
      }
    }
  }
`;

export const addTaskMutation = gql`
  mutation($description: String!, $date: String!, $user: String!) {
    addTask(description: $description, date: $date, user: $user) {
      description
      date
      user
    }
  }
`;

export const removeTaskMutation = gql`
  mutation($id: ID!) {
    removeTask(id: $id) {
      description
    }
  }
`;

export const addUserMutation = gql`
  mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
      password
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String
    description: String
    isPending: Boolean
    isDone: Boolean
  }

  type TaskPayload {
    success: Boolean!
    message: String
    task: Task!
  }

  type Query {
    tasks: [Task]!
    task(id: ID!): Task
  }

  type Mutation {
    addTask(task: TaskInput!): TaskPayload
    updateTask(id: ID!, task: TaskInput!): TaskPayload
    setTaskAsDone(id: ID!): TaskPayload
    setTaskAsPending(id: ID!): TaskPayload
    deleteTask(id: ID!): TaskPayload
  }

  input TaskInput {
    title: String
    description: String
  }
`;

export { typeDefs };

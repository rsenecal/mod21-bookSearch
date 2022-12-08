const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
    skills: [String]!
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    books:[]
  }

  
  type Auth {
    token: ID!
    book: Book
  }

  type Query {
    books: [Book]!
    book(bookId: ID!): Book
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    addBook(authors: String!, description: String!, bookId: String!, image: String!, link: String!, title: Strings!): Auth
    login(email: String!, password: String!): Auth

    addUser(userId: ID!, username: String!, email:Strings!): User
    saveBook(userId: ID!, ): User
    deleteBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
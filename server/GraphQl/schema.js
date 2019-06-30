const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {        
        login: String
        password: String
    }        

    type Query {
        getUser(login: String) : User      
        login(login: String, password: String) : User   
        logout : User    
        check : User   
    }

    input UserInput {
        login: String!
    }

    type Mutation {
        signup(login: String,password: String) : User
        createUser(input: UserInput!): User       
    }
`);
const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type binery {
        value: String!
    }
    type text {
        value: String!
    }

    type RootQuery {
        toBainery(text: String!):binery!
        formatBainery(value: String!): text!

    }

    schema{
        query: RootQuery
    }
`)


//modules imports
const graphql = require("graphql")
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

/**
 * responses type model
 */
const ResponseType = new GraphQLObjectType({
    name: "Response",
    fields: () => ({
        status: { type: GraphQLInt },
        info: { type: GraphQLString }
    })
})

export default ResponseType

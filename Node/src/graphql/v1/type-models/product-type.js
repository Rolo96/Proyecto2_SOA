//modules imports
const graphql = require("graphql")
const { GraphQLObjectType, GraphQLInt } = graphql

/**
 * product type model
 */
const ProductType = new GraphQLObjectType({
    name: "Produc",
    fields: () => ({
        id: {type: GraphQLInt},
        amount: {type: GraphQLInt},
        cost: { type: GraphQLInt }
    })
})

export default ProductType

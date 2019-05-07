//modules imports
const graphql = require("graphql")
const { GraphQLInputObjectType, GraphQLInt } = graphql

/**
 * input object for products
 */
const InputProductType = new GraphQLInputObjectType({
    name: "InputProduct",
    fields: () => ({
        id: { type: GraphQLInt },
        amount: {type: GraphQLInt},
        cost: { type: GraphQLInt }
    })
})

export default InputProductType

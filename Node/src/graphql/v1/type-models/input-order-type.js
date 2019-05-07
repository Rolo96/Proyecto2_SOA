//modules imports
const graphql = require("graphql")
const { GraphQLInputObjectType, GraphQLList, GraphQLInt } = graphql

//local imports
import InputProduct from "./input-product-type"

/**
 * Input object for orders
 */
const InputOrderType = new GraphQLInputObjectType({
    name: "InputOrder",
    fields: () => ({
        id: { type: GraphQLInt },
        userid: { type: GraphQLInt },
        products: { type: new GraphQLList(InputProduct) },
        total: { type: GraphQLInt }
    })
})

export default InputOrderType

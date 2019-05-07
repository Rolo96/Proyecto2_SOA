//modules imports
const graphql = require("graphql")
const { GraphQLObjectType,GraphQLString, GraphQLInt, GraphQLList } = graphql

//local imports
import Product from './product-type'

/**
 * order type model
 */
const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: {type: GraphQLInt},
        date: {type: GraphQLString},
        userid: { type: GraphQLInt },
        products: {type: new GraphQLList(Product) },
        total: { type: GraphQLInt }
    })
})

export default OrderType

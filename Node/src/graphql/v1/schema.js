//modules imports
const graphql = require("graphql")
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLList } = graphql

//local imports
import OrderType from "./type-models/order-type"
import ResponseType from "./type-models/response-type"
import InputOrderType from "./type-models/input-order-type"
import Models from "../../models"

/**
 * Schema for mutations
 */
const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        CreateOrder: {
            type: ResponseType,
            args: {
                order: { type: InputOrderType }
            },
            async resolve(parent, args) {
                let order = args.order
                delete order.id
                let result = await Models.orders
                    .create(order)
                    .then(() => {
                        return { status: 0, info: "created" }
                    })
                    .catch(error => {
                        console.log(error)
                        return { status: -1, info: "error" }
                    })
                return result
            }
        },
        UpdateOrder: {
            type: ResponseType,
            args: {
                order: { type: InputOrderType }
            },
            async resolve(parent, args) {
                let order = args.order
                if (args.order.products != null) {
                    order.products = args.order.products
                }
                let result = await Models.orders
                    .update(order, { where: { id: order.id } })
                    .then(order => {
                        if(order[0] == 0)
                            return { status: 1, info: "does not exist" }
                        return { status: 0, info: "updated" }
                    })
                    .catch(error => {
                        console.log(error)
                        return { status: -1, info: "error" }
                    })
                return result
            }
        },
        DeleteOrder: {
            type: ResponseType,
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args) {
                let result = await Models.orders
                    .destroy({ where: { id: args.id } })
                    .then(order => {
                        if(order == 0)
                            return { status: 1, info: "does not exist" }
                        return { status: 0, info: "deleted" }
                    })
                    .catch(error => {
                        console.log(error)
                        return { status: -1, info: "error" }
                    })
                return result
            }
        }
    }
})

/**
 * Schema for queries
 */
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        Order: {
            type: OrderType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                let result = Models.orders.findOne({
                    where: {
                        id: args.id
                    }
                })
                result.catch(error => {
                    console.log(error)
                })
                return result
            }
        },
        Orders: {
            type: new GraphQLList(OrderType),
            async resolve() {
                let result = await Models.orders.findAll()
                return result
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

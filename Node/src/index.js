"use strict"
//modules imports
const models = require('./models')
import Hapi from "hapi"
import { graphqlHapi, graphiqlHapi } from "apollo-server-hapi"

//local imports
import schema from "./graphql/v1/schema"

//set up server
const server = Hapi.server({
    host: "0.0.0.0",
    port: 8000
})


// defoult route
server.route({
    method: "GET",
    path: "/",
    handler: function() {
        return "<h1>Ingrese a /graphiql</h1>"
    }
})

// Start the server
const start = async function() {
    try {
        await models.sequelize
    
        await server.register({
            plugin: graphiqlHapi,
            options: {
                path: "/graphiql",
                graphiqlOptions: { endpointURL: "/graphql" },
                route: { cors: true }
            }
        })

        await server.register({
            plugin: graphqlHapi,
            options: {
                path: "/graphql",
                graphqlOptions: { schema },
                route: { cors: true }
            }
        })

        console.log("starting server")
        await server.start()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log("Server running at:", server.info.uri)
}

start()

"use strict";

import Hapi from "hapi";

import OrdersRoute from "./api/v1/orders"
import UsersRoute from "./api/v1/users"

// Create a server with a host and port
const server = Hapi.server({
  host: "0.0.0.0",
  port: 8086
});

OrdersRoute(server)
UsersRoute(server)

// Add the route
server.route({
  method: "GET",
  path: "/hello",
  handler: function(request, h) {
    return "<h1>hello world</h1>";
  }
});

// Start the server
const start = async function() {
  try {
    console.log("starting server");
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();

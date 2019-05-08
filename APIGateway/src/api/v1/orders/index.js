
import { GetOrders, CreateOrder, UpdateOrder, DeleteOrder } from './orders-handler'

const rootUri = "/CompraTEC/orders"

function OrdersRoute(server) {
  server.route([
    {
      method: "GET",
      path: rootUri,
      handler: request => GetOrders(request)
    },
    {
      method: "POST",
      path: rootUri,
      handler: request => CreateOrder(request)
    },
    {
      method: "PUT",
      path: rootUri,
      handler: request => UpdateOrder(request)
    },
    {
      method: "DELETE",
      path: rootUri,
      handler: request => DeleteOrder(request)
    }
  ]);
}

export default OrdersRoute;

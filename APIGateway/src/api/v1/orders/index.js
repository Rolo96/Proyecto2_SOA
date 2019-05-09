
import { GetOrders, CreateOrder, UpdateOrder, DeleteOrder } from './orders-handler'
import TokenValidation from "../token-validation"

const rootUri = "/CompraTEC/orders"

function OrdersRoute(server) {
  server.route([
    {
      method: "GET",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return GetOrders(request, response)
      }
    },
    {
      method: "POST",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return CreateOrder(request, response)
      }
    },
    {
      method: "PUT",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return UpdateOrder(request, response)
      }
    },
    {
      method: "DELETE",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return DeleteOrder(request, response)
      }
    }
  ]);
}

export default OrdersRoute;

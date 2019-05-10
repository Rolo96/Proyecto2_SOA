import {
  GetProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct
} from "./products-handler";
import TokenValidation from "../token-validation"

const rootUri = "/CompraTEC/products";

function ProductsRoute(server) {
  server.route([
    {
      method: "GET",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return GetProducts(request, response);
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
        return CreateProduct(request, response);
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
        return UpdateProduct(request, response);
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
        return DeleteProduct(request, response);
      }
    }
  ]);
}

export default ProductsRoute;

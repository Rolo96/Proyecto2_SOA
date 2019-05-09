import {
  GetUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
  Login
} from "./users-handler";
import TokenValidation from "../token-validation"

const rootUri = "/CompraTEC/users";

function UsersRoute(server) {
  server.route([
    {
      method: "GET",
      path: rootUri,
      handler: (request, response) => {
        let validation = TokenValidation(request);
        if (validation) {
          return validation;
        }
        return GetUsers(request, response);
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
        return CreateUser(request, response);
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
        return UpdateUser(request, response);
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
        return DeleteUser(request, response);
      }
    },
    {
      method: "POST",
      path: "/CompraTEC/login",
      handler: (request, response) => Login(request, response)
    }
  ]);
}

export default UsersRoute;

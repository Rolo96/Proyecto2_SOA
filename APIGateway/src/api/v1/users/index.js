
import { GetUsers, CreateUser, UpdateUser, DeleteUser } from './users-handler'

const rootUri = "/CompraTEC/users"

function UsersRoute(server) {
  server.route([
    {
      method: "GET",
      path: rootUri,
      handler: request => GetUsers(request)
    },
    {
      method: "POST",
      path: rootUri,
      handler: request => CreateUser(request)
    },
    {
      method: "PUT",
      path: rootUri,
      handler: request => UpdateUser(request)
    },
    {
      method: "DELETE",
      path: rootUri,
      handler: request => DeleteUser(request)
    }
  ]);
}

export default UsersRoute;

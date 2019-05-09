import { request as sendRequest } from "graphql-request";
const jwt = require("jsonwebtoken");

const uri = "http://localhost:8087/graphql";

export const GetUsers = function(request, response) {
  let query = "";
  if (request.query.id) {
    const { id } = request.query;
    query = `query{ User(id: ${id} ){ id firstname lastname password}}`;
  } else {
    query = `query{ Users{ id firstname lastname password}}`;
  }
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return response.response(error.response).code(409);
    });
};

export const CreateUser = function(request, response) {
  const { id, firstname, lastname, password } = request.payload;
  const user = `{id:${id},firstname:"${firstname}",lastname:"${lastname}",
    password:"${password}"}`;
  let query = `mutation{ CreateUser(user: ${user} ){ status info }}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.CreateUser.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      console.log(error)
      return response.response(error).code(409);
    });
};

export const UpdateUser = function(request, response) {
  const { id, firstname, lastname, password } = request.payload;
  const user = `{id:${id},firstname:"${firstname}",lastname:"${lastname}",password:"${password}"}`;
  let query = `mutation{ UpdateUser(user: ${user}){ status info}}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.UpdateUser.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      return response.response(error.response).code(409);
    });
};

export const DeleteUser = function(request, response) {
  const { id } = request.query;
  let query = `mutation{ DeleteUser(id:${id}){ status info}}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.DeleteUser.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      return response.response(error.response).code(409);
    });
};

export const Login = async function(request, response) {
  const { id, password } = request.payload;
  const { User } = await GetUsers({ query: { id: id } });
  if (!User) {
    return response.response({ error: "User does not exist" }).code(400);
  }
  if (Buffer(User.password, "base64").toString() != password) {
    return response.response({ error: "Password incorrect" }).code(401);
  }
  let token = jwt.sign({ Id: id }, "compratec123", {
    expiresIn: 60 * 60 * 24
  });
  return { token };
};

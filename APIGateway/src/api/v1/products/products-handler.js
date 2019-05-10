import { request as sendRequest } from "graphql-request";
const jwt = require("jsonwebtoken");

const uri = "http://192.168.43.163:5000/graphql";

export const GetProducts = function(request, response) {
  let query = "";
  if (request.query.code) {
    const { code } = request.query;
    query = `query{ GetProducts(code: ${code} ){ name code cost amount }}`;
  } else {
    query = `query{ GetProducts{ name code cost amount }}`;
  }
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return response.response(error.response).code(409);
    });
};

export const CreateProduct = function(request, response) {
  const { name, code, amount, cost } = request.payload;
  const product = `name:"${name}",code:${code},amount:${amount},
    cost:${cost}`;
  let query = `mutation{ createProduct(${product}){ product { id } }}`;
  return sendRequest(uri, query)
    .then(result => {
      return response.response({info:"created"});
    })
    .catch(error => {
      console.log(error)
      return response.response(error).code(409);
    });
};

export const UpdateProduct = function(request, response) {
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

export const DeleteProduct = function(request, response) {
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


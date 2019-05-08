import { request as sendRequest } from "graphql-request";

const uri = "http://localhost:8087/graphql";

export const GetUsers = function(request) {
  let query = "";
  if (request.query.id) {
    const { id } = request.query;
    query =
      "query{ User(id:" + id + "){ id firstname lastname username password}}";
  } else {
    query = "query{ Users{ id firstname lastname username password}}";
  }
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const CreateUser = function(request) {
  const { id, firstname, lastname, password, username } = request.payload;
  const user = `{id:${id},firstname:"${firstname}",lastname:"${lastname}",
    password:"${password}", username: "${username}"}`;
  let query = `mutation{ CreateUser(user: ${user} ){ status info}}`;
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const UpdateUser = function(request) {
  const { id, firstname, lastname, password } = request.payload;
  const user = `{id:${id},firstname:"${firstname}",lastname:"${lastname}",password:"${password}"}`;
  let query = `mutation{ UpdateUser(user: ${user}){ status info}}`;
  console.log(query);
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const DeleteUser = function(request) {
  const { id } = request.query;
  let query = `mutation{ DeleteUser(id:${id}){ status info}}`;
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

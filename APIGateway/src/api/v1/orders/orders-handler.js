import { request as sendRequest } from "graphql-request";

const uri = "http://localhost:8000/graphql";

export const GetOrders = function(request) {
  let query = "";
  if (request.query.id) {
    const { id } = request.query;
    query = `query{ Order(id:
      ${id}
      ){ id userid date products{ id amount cost } total}}`;
  } else {
    query = "query{ Orders{ id userid date products{ id amount cost } total}}";
  }
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const CreateOrder = function(request) {
  const order = JSON.stringify(request.payload).replace(/\"/g, "");
  let query = `mutation{ CreateOrder(order: ${order} ){ status info}}`;
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const UpdateOrder = function(request) {
  const order = JSON.stringify(request.payload).replace(/\"/g, "");
  let query = `mutation{ UpdateOrder(order: ${order} ){ status info}}`;
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

export const DeleteOrder = function(request) {
  const { id } = request.query;
  let query = `mutation{ DeleteOrder(id: ${id} ){ status info}}`;
  return sendRequest(uri, query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

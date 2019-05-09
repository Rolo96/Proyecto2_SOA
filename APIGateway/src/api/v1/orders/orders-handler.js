import { request as sendRequest } from "graphql-request";

const uri = "http://localhost:8000/graphql";

export const GetOrders = function(request, response) {
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
      return response.response(error.response).code(409)
    });
};

export const CreateOrder = function(request, response) {
  const order = JSON.stringify(request.payload).replace(/\"/g, "");
  let query = `mutation{ CreateOrder(order: ${order} ){ status info}}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.CreateOrder.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      return response.response(error.response).code(409)
    });
};

export const UpdateOrder = function(request, response) {
  const order = JSON.stringify(request.payload).replace(/\"/g, "");
  let query = `mutation{ UpdateOrder(order: ${order} ){ status info}}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.UpdateOrder.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      return response.response(error.response).code(409)
    });
};

export const DeleteOrder = function(request, response) {
  const { id } = request.query;
  let query = `mutation{ DeleteOrder(id: ${id} ){ status info}}`;
  return sendRequest(uri, query)
    .then(result => {
      if (result.DeleteOrder.status != 0) {
        return response.response(result).code(400);
      }
      return result;
    })
    .catch(error => {
      return response.response(error.response).code(409)
    });
};

const jwt = require("jsonwebtoken");

/**
 * Validate token, return false if token is ok
 * @param {*} request request with expected token in the header
 */
 const ValidateToken = function(request) {
  var token = request.headers["authorization"];

  if (!token) {
    //no token
    return { error: "No token was sent" };
  }
  token = token.replace("Bearer ", "")
  return jwt.verify(token, "compratec123", function(error) {
    if (error) {
      //token invalid
      console.log("no ok");
      return { error: "Token invalid" }
    } else {
      //token ok
      return false;
    }
  });
};


export default ValidateToken;

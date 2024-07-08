const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
    const tokenWithoutPrefix = token.split(" ")[1];
    const decodedToken = jwt.verify(tokenWithoutPrefix, "rahasia");
    
    return decodedToken;
}

module.exports = decodeToken;
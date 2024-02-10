require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

const createJWT = async (connectionId) => {
  return jwt.sign(
    {
        id:connectionId
    },
    process.env.TOKEN_KEY
  );
};

const verifyJWT = (token) => {
  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
        console.log(err)
        return false;
      }
      if (isNaN(decoded.id))
        return false
    });

    return true;
  } catch (err) {
    console.log(err)
    return false
  }
};

module.exports = { createJWT, verifyJWT };
const jwt = require("jsonwebtoken");
const Authentication = (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    let deocdedata = jwt.verify(token, "logging");
    // console.log("i am decode", deocdedata);
    req.body.userId = deocdedata.userId;
    next();
  } else {
    res.send("login first");
  }
};
module.exports = {
  Authentication,
};

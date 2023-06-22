const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;
  console.log("primer paso", req.user);
  next();
}

const isAdmin = (req, res, next) => {
  console.log("REQUSER", req.user);
  if (req.user.is_admin) {
    console.log("sgdo paso");
    next();
  } else {
    res.status(403).send("Acceso denegado"); // Usuario no es un administrador, deniega el acceso
  }
};

module.exports = { validateAuth, isAdmin };

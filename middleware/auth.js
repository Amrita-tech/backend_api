const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
   
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};

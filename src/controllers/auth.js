const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  if (!req.cookies.access) res.status(401).render('alert');
  else {
    const { access } = req.cookies;
    const privateKey = process.env.PRIVATE_KEY;
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) res.status(401).render('alert');
      else {
        const { id, username } = decoded;
        req.userId = { id, username };
        next();
      }
    });
  }
};

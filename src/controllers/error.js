exports.clientError = (req, res) => {
  res.status(404).send('404 Client Error');
};

exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send('500 Server Error');
};

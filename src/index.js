const { app } = require('./app');

// Getting The Port
const port = app.get('port');

// Running The Server
app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});

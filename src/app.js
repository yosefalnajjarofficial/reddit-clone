const express = require('express');
const exphbs = require('express-handlebars');
const { join } = require('path');
const morgan = require('morgan');

const app = express();

const { router } = require('./controllers');

app.set('port', process.env.PORT || 5000);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: join(__dirname, 'views', 'layouts'),
    partialsDir: join(__dirname, 'views', 'partials'),
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);

module.exports = {
  app,
};

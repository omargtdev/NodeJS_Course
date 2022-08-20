const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

const PORT = 3000;
const HOST = 'localhost';

// Pages
const GET_PAGES = ["/", "/about", "/contact", "/add-product"];
const POST_REQUEST = ["/product"];

const pageNotFound = (res) => {
  res.send("<h1>Page Not Found</h1>");
};

/*************** Middlewares *********************/

app.use(bodyParser.urlencoded({ extended : false }));

app.use((req, res, next) => {
  const { method, url } = req;

  if (method === "GET") {
    const isExistPage = GET_PAGES.includes(url);
    return isExistPage ? next() : pageNotFound(res);
  }

  if (method === "POST") {
    const isExistRequest = POST_REQUEST.includes(url);
    return isExistRequest ? next() : next("Not request found -> ", url);
  }
}); /*********************************************/

// Routes
app.use(routes);

app.listen(PORT, HOST, () => console.log(`Server called ${HOST} listen on port ${PORT}`))

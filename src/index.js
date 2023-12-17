import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
// import cors from 'cors';

require('dotenv').config();

const app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    // Chỉ cho phép web có đường link http://localhost:3000 được gọi đến server

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB();
const port = process.env.PORT || 3000;


// Để chạy server app.listen
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: "+ port);
})
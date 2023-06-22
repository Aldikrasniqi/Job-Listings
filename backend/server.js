// setup a node js server
const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require('./Lib/dbConfig');
const dashboardRoute = require('./Routes/getDashboard/DashboardRoute');
const authRoute = require('./Routes/Auth/auth.routes');
const JobRoute = require('./Routes/jobs.route');
const app = express();
const responder = require('./Lib/baseResponses.js');
const port = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection.connect();

app.use('/dashboard/', dashboardRoute);
app.use('/auth/', authRoute);
app.use('/jobs/', JobRoute);
// error handler
app.use((error, req, res, next) => {
  console.log('here');
  res.json(responder.fail(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Path: backend/server.js

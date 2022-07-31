/**
 * Declaración de dependencias del servidor.
 * @express - Peticiones HTTP.
 * @body_parse - Gestión de cabeceras de las peticiones.
 * @scheduledJobFunction - 
 */
const express = require('express');
const bodyParser = require('body-parser');
const scheduledJobFunction= require('./src/services/ScheduledJobs');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const port = process.env.PORT || 3000;

app.set("port", port);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/home', express.static('public'));

// ADD CALL HERE
scheduledJobFunction.initScheduledJobs();

app.listen(app.get("port"), () => {
	console.log("Express server listening on port " + app.get("port"));
  });
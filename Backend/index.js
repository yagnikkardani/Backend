const config = require('./config/env.config.js');

const express = require('express');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Router = require('./routes.config');

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Backend API",
			version: "1.0.0",
			description: "A simple NodeJS Backend API",
		},
		servers: [
			{
				url: "http://localhost:3600",
			},
		],
	},
	apis: ["./controllers/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
Router.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
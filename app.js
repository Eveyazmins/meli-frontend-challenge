const createError = require('http-errors');
const express = require('express');
const path = require('path');

const itemsRouter = require('./routes/items');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	next();
});

app.use('/api/items', itemsRouter);

app.use((_req, _res, next) => {
	next(createError(404));
});

app.use((err, req, res, _next) => {
	res.locals.message = err.message;
	console.log('***', res.locals.message);
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err.message || `Error code ${err.status || 500}`);
});

module.exports = app;

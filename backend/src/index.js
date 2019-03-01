const express = require('express');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');

// #region Settings.
app.set('port', process.env.PORT || 3000);
// #endregion Settings.

// #region Middlewares.
app.use(morgan('dev'));
app.use(express.json());
// #endregion Middlewares.

// #region Routes.
app.use('/api/employees', require('./routes/employee.routes'));
// #endregion Routes.

// Starting the server:
app.listen(app.get('port'), () => {
	console.log('Server on port ', app.get('port'));
});

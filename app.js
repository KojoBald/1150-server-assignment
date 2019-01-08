require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser')

const UserController = require('./controllers/user-controller');
const LogController = require('./controllers/log-controller');

require('./db').sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers.js'));

app.use('/api/user', UserController);

app.use(require('./middleware/validate-session.js'));
app.use('/api/log', LogController);

app.listen(3000);
const Sequelize = require('sequelize');

const sequelize = new Sequelize('challengedatabase', 'postgres', process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log('connected to challenge database');
}).catch(err => {
    console.error(`unable to connect to challenge database. ${err.message}`);
});

module.exports = sequelize;
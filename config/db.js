const Sequelize = require('sequelize')


const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI)

// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USER_NAME,
//     process.env.DATABASE_PASSWORD, {
//         dialect: 'postgres',
//         host: 'containers-us-west-22.railway.app'
//     }
// );

module.exports = sequelize

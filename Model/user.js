const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')
const bcrypt = require("bcrypt");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});


User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
    })
})

User.beforeUpdate((user) => {
    return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
    })
})

module.exports = User
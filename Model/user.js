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
    followerCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    followingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
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
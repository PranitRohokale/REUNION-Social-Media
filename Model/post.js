const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");


const Post = sequelize.define('post', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: 'id'
        }
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    commentsCount: {
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
});


module.exports = Post
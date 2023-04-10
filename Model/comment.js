const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post");
const User = require("./user");



const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
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
    postId: {
        type: DataTypes.BIGINT,
        references: {
            model: Post,
            key: 'id'
        }
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


module.exports = Comment
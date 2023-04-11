const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post");
const User = require("./user");


const Like = sequelize.define('like', {
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: 'id'
        },
        primaryKey: true,
    },
    postId: {
        type: DataTypes.BIGINT,
        references: {
            model: Post,
            key: 'id'
        },
        primaryKey: true,
    },
    isLike: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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





module.exports = Like
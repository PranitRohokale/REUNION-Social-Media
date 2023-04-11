const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Post = require("./post");

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
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
}, {
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

module.exports = Comment;

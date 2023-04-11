const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post");
const User = require("./user");


const Like = sequelize.define('like', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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




module.exports = Like
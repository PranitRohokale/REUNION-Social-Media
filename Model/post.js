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
}, {
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

Post.prototype.incrementLikes = async function () {
    await this.increment('likesCount');
};

Post.prototype.decrementLikes = async function () {
    await this.decrement('likesCount');
};

Post.prototype.incrementComments = async function () {
    await this.increment('commentsCount');
};

Post.prototype.decrementComments = async function () {
    await this.decrement('commentsCount');
};


module.exports = Post
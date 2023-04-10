
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");


const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    follower_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    following_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['follower_id', 'following_id']
        }
    ]
});


module.exports = Follow
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'andrejkapustin', 'Napoleon1703', {
    host: 'localhost',
    dialect: 'postgres'
});

const Message = sequelize.define('Message', {
    senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = { sequelize, Message };

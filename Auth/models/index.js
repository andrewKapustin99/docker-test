const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'andrejkapustin', 'Napoleon1703', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

// module.exports = { sequelize, User, Message };
module.exports = { sequelize, User };


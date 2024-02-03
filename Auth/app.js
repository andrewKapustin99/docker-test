const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User } = require('./models');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).send(error.message);
    }
});

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Registration service running on port ${PORT}. Database has been reset.`);
    });
});
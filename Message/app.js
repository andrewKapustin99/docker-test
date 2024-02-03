const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../Auth/models/index');
const {sequelize, Message} = require('./models/index')

const app = express();
const PORT = 3001; // Убедитесь, что этот порт отличается от порта микросервиса регистрации

app.use(bodyParser.json());

// Endpoint для отправки сообщения
app.post('/send', async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        // Проверяем наличие пользователей в базе данных
        const sender = await User.findByPk(senderId);
        const receiver = await User.findByPk(receiverId);

        if (!sender || !receiver) {
            return res.status(404).send('Sender or receiver not found');
        }

        // Создаем сообщение в базе данных
        console.log("!!!!!!!!!!!!!!!!!!", senderId, receiverId, message);
        const msg = await Message.create({ senderId, receiverId, message });
        console.log("===============================");
        return res.status(201).json(msg);
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(400).send(error.message);
    }
});

// Запускаем сервер после синхронизации моделей с базой данных
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Message service running on port ${PORT}`);
    });
});

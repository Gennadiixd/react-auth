const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Проверка на наличие сессии текущего пользователя
router.get('/check', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        let user = await User.findOne({ login: req.session.user.login })
        res.json(user)
    } else { res.send('false') }
})

//Выход пользователя из сессии
router.get('/logout', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        req.session.destroy()
    }
    res.status(200).send({ status: 'Logged out' })
})

//Регистрация пользователя
router.post('/signup', async (req, res, next) => {
    try {
        let user = new User({
            login: req.body.login,
            password: req.body.password,
        })
        await user.save()
        req.session.user = user;
        res.json(user)
    } catch (error) { res.status(400).send({ message: 'Login ar Password is already in use' }) }
});

//Вход пользователя
router.post('/login', async (req, res, next) => {
    let user = await User.findOne({ login: req.body.login[0] })
    if (user) {
        if (await user.comparePassword(req.body.password[0])) {
            req.session.user = user;
            delete user._doc.password;
            res.json(user);
        } else res.status(400).send({ message: 'Неверный пароль' })
    } else res.status(400).send({ message: 'Пользователь не найден' })
})

module.exports = router;
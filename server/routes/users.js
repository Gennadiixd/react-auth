const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Проверка на наличие сессии текущего пользователя
router.get('/check', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        let user = await User.findOne({ login: req.session.user.login })
        if (user) {
            res.json({ isAuth: true })
        } res.json({ isAuth: false })
    } else { res.json({ isAuth: false }) }
})

//Выход пользователя из сессии
router.get('/logout', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        req.session.destroy()
        res.send({ status: 'Logged out' })
    } else {
        res.send({ status: 'Not logged in' })
    }
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
        console.log(user)
        res.json({ status: `Sign up success! Welcome ${user.login}` })
    } catch (error) {
        console.log('error')
        res.json({ status: 'Login or Password is already in use' })
    }
});

//Вход пользователя
router.post('/login', async (req, res, next) => {
    let user = await User.findOne({ login: req.body.login[0] })
    if (user) {
        if (await user.comparePassword(req.body.password[0])) {
            req.session.user = user;
            delete user._doc.password;
            res.json({ isAuth: true, status: `Successfully logge id ${user.login}` });
        } else res.json({ status: 'Wrong password or login' })
    } else res.json({ status: 'Wrong password or login' })
})

module.exports = router;
const crypto = require('crypto')
const User = require('../models/user')
// let users = [{ id: 1, name: "Vasia", password: "admin", gender: "M" }, { id: 2, name: "Petia", password: "admin", gender: "M" }, { id: 3, name: "Masha", password: "admin", gender: "F" }]

module.exports = {

    getUser: async ({ login }) => {
        let user = await User.findOne({ login: login })
        return user
    },

    login: async ({ login, password }, req) => {
        let user = await User.findOne({ login: login })
        if (user) {
            if (await user.comparePassword(password)) {
                req.session.user = user;
                delete user._doc.password;
                return user
            } return { login: "Error" }
        } return { login: "Error" }
    },

    signup: async ({ login, password }, req) => {
        console.log(login, password)
        try {
            let user = new User({
                login: login,
                password: password,
            })
            await user.save()
            req.session.user = user;
            console.log(user)
            return user
        } catch (error) {
            console.log('error')
            return { login: "Error" }
        }
    },

}
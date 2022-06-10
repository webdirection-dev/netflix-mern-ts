const CryptoJS = require("crypto-js")
const router = require('express').Router()
const User = require('../models/User')

//REGISTER
router.post('/register', async (req, res) => {
    const key = process.env.SECRET_KEY
    const {username, email, password} = req.body

    const pass = CryptoJS.AES.encrypt(password, key)

    const newUser = new User({
        username,
        email,
        password: pass
    })

    try {
        const user = await newUser.save()
        const {password, ...info} = user._doc
        return res.status(201).json(info)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    const key = process.env.SECRET_KEY
    const {email} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) return res.status(401).json('Wrong password or username!')

        const bytes = CryptoJS.AES.decrypt(user.password, key)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) return res.status(401).json('Wrong password or username!')

        const {password, ...info} = user._doc
        return res.status(200).json(info)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router
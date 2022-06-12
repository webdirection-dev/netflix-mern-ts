const router = require('express').Router()
const CryptoJS = require('crypto-js')

const verify = require('../verifyToken')
const User = require('../models/User')

//UPDATE
router.put(
    '/:id',
    verify, // middleware
    async (req, res) => {
        const {id, isAdmin} = req.user
        const {password} = req.body

        if (req.params.id === id || isAdmin) {
            if (password) req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new: true}
                )

                return res.status(200).json(updatedUser)
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy can update only your account!')
        }
    }
)

//DELETE
router.delete(
    '/:id',
    verify, // middleware
    async (req, res) => {
        const {id, isAdmin} = req.user

        if (req.params.id === id || isAdmin) {
            try {
                await User.findByIdAndDelete(req.params.id)
                return res.status(200).json('User has been deleted...')
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy can delete only your account!')
        }
    }
)

//GET
router.get(
    '/find/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const {password, ...info} = user._doc

            return res.status(200).json(info)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//GET ALL
router.get(
    '/',
    verify, // middleware
    async (req, res) => {
        const query = req.query.new // for example /users?new=true

        if (req.user.isAdmin) {
            try {
                const users = query ?
                    await User.find().sort({_id: -1}).limit(10)
                    :
                    await User.find()

                return res.status(200).json(users)
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy are not allowed to see all users.')
        }
    }
)

//GET USER STATS
router.get(
    '/stats',
    async (req, res) => {
        const today = new Date()
        const lastYear = today.setFullYear(today.setFullYear() - 1)

        const monthsArray = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
        ]

        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: {$month: "$createdAt"}
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: 1},
                    }
                }
            ])

            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

module.exports = router
const Router = require('express')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/file')

const router = new Router()

router.post('/registration', [
    check('email', 'Uncorrenct email').isEmail(),
    check('password', 'Password must be longer then 3 add shorter then 12').isLength({ min: 3, max: 12 })
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Uncorrect request', errors })
            }
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exist ` })
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })
            await user.save()
            await fileService.createDir(new File({ user: user.id, name: '' }))
            return res.json({ message: 'user was created' })
        } catch (e) {
            res.send({ message: 'server Error reg' })
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: 'invalid password' })
            }
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })

        } catch (e) {

            res.send({ message: 'server error ' })
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id })
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'server error ' })
        }
    }
)


module.exports = router
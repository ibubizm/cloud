const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/authRoutes')
const fileRouter = require('./routes/fileRouter')
const cors = require('cors')
const app = express()
const PORT = config.get('serverPort') || 5000


app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('work', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
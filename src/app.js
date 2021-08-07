const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
const logging = require('morgan')
require('./utils/connectMongodb')()

app.use(logging('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => console.log(`This server is running at ${PORT}`))
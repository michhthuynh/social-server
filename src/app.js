const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()
const cors = require('cors')
require('./utils/connectMongodb')()
const router = require('./routes')


app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => console.log(`This server is running at ${PORT}`))
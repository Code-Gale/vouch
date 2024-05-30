const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.get('/api', (req, res) => {
    res.json({message : 'Welcome to default page'})
})

app.listen(PORT, () => {
    console.log('Listening for request on port', PORT)
})
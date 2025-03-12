require('dotenv').config()

const express = require("express")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(routes)

app.use((req, res, next) => {
    res.set('ngrok-skip-browser-warning', 'dawda');
    next()

})

module.exports = app

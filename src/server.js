require('dotenv').config();

const express = require('express');
const app = express()
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(PORT, () => console.log(`Server listen ${PORT}`))
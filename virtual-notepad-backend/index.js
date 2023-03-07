const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended:false}))

const PORT = process.env.PORT || 4444

app.listen(PORT,()=>{
    console.log(`server start on PORT ${PORT}`);
})
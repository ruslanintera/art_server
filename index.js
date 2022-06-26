require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const mysql = require('mysql2'); // or use import if you use TS
const util = require('util');
const fs = require("fs");

var bodyParser = require('body-parser')

const PORT = process.env.PORT || 5001

const app = express()

/*********************************************** */
const local = true;
let http, ip
if(local) {
    http = require('http').createServer(app);
    ip = 'localhost';
} else {
    http = require('https').createServer({
        key: fs.readFileSync('../../../../../../httpd-cert/www-root/tflex3d.ru_le1.key'), //privkey
        cert: fs.readFileSync('../../../../../../httpd-cert/www-root/tflex3d.ru_le1.crt'), // sert
      }, app);
    ip = '5.187.1.90';
}
//const io = require('socket.io')(http, { cors: { origin: '*' } });


app.use(cors({ credentials: true, origin: process.env.CLIENT_URL })); // JWT

app.use(express.json({ limit: '25mb' }))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser());
app.use(fileUpload({}))
app.use('/api', router)

console.log("========================================= index ! ==============================================")
// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        http.listen(PORT, ip, () =>console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}
start()







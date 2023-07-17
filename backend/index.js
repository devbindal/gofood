const express = require('express')
const app = express()
const port = 5050
const mongoDB=require('./db')
const Order=require('./models/Orders')
// app.use(bodyparser.urlencoded({ extended: true }));
// mongoDB()
app.use((req, res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept");
    next()
})

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData")) 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// rai@gmail.com
// 12345678

// abc123@gmail.com
// abc123

// admin@gmail.com
// admin1234
const express = require('express');
const authRoutes  = require('./routes/authRoutes')
// const passportConfig = require('./services/passport') //When a file importing does not returning anyting  you can require it directory and that file will get executed automatically
require('./services/passport')

const app = express();

//Calling authRoutes
authRoutes(app)



app.get('/', (req, res) => {
    res.send({
        name:'EMMANUEL'
    })
})





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})



const express = require('express');
const app = express();
const connect  = require('./config/db');


connect();
//initial middleware
app.use(express.json({extended : false}));
app.get('/',(req, res)=>{
    res.json('api is work hello world');
})

// define routing
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listen on port ${PORT}`);
})

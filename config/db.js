const mongoose = require('mongoose');
const config = require('config');
const db = config.get('dbUrl');

//koneksi db

const connectDb = async ()=>{
    try{
        await mongoose.connect(db, {useNewUrlParser : true, useCreateIndex : true});
        console.log('mongo db connected..');
    }catch(e){
        console.log(e.message);
        
        //exit proses failure
        process.exit(1);
    }
}

module.exports = connectDb;
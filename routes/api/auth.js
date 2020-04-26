const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { check, validationResult} = require('express-validator');

//@route get /auth
//@desc auth User
//@access Public
router.get('/', auth,  async (req, res)=> {
    // res.send('Auth Routing')
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(401).json({ msg : 'gagal'});
    }
});

//@route post api/auth
//@desc Login User
//@access Public
router.post('/',[
  
    check('email', 'Email harus valid').isEmail(),
    check('password', 'Password harus 6 karakter').exists()
],async (req, res)=>{
    //handle validasi error 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    // membuat variabel destructring 
    const { email, password} = req.body;
    try{
            let user =  await User.findOne({ email });
            //jika user tidak ada
            if(!user){
                return res.status(400).json({ error : [{ msg : "User Invalid"}]});
            }

           //compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ error : [{ msg : "Password Invalid"}]});    
            }
          
            //return jsonwebtoken
            const payload = {
                user : {
                    id : user.id
                }
            };
            jwt.sign(payload, config.get('jwt-secret'),{expiresIn : 36000},
                (err, token)=>{
                    if(err){
                        throw err;
                    }

                    res.json({token});
                }
            )
            //res.send('User Routing');
    }catch(e){
            console.log(e.message);
            res.status(500).send("server error");
    }
 
});



module.exports = router; 

const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
//@route post api/users
//@desc Register User
//@access Public
router.post('/',[
    check('name', 'nama harus diisi').not().isEmpty(),
    check('email', 'Email harus valid').isEmail(),
    check('password', 'Password harus 6 karakter').isLength({
        min : 6
    }),
],async (req, res)=>{
    //handle validasi error 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    // membuat variabel destructring 
    const { name, email, password} = req.body;
    try{
            let user =  await User.findOne({ email });
            if(user){
                return res.status(400).json({ error : [{ msg : "Email Sudah Terdaftar"}]});
            }

            // membuata gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name, email, password, avatar
            });

            //membuat hash password dengan salt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //menyimpan user
            await user.save();

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

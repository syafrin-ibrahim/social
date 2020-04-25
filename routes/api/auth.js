const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.get('/', auth,  async (req, res)=> {
    // res.send('Auth Routing')
    try{
        const user = await User.findById(req.user.id).select('-passeord');
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(401).json({ msg : 'gagal'});
    }
});

module.exports = router; 

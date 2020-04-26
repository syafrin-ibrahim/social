const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult} = require('express-validator');

//@route post api/profile/me
//@desc get Profile User
//@access Private
router.get('/me', auth, async (req, res)=>{;
    try{
        const profile = await Profile.findOne({ user : req.user.id }).populate('user',['name', 'avatar']);
        if(!profile){
            res.status(400).json({ msg : 'tidak ada profile untuk user ini'});
        }

        res.status(200).json(profile);
    }catch(err){
        console.log(err.message); 
        res.status(500).send('server error');       
    }
});

//@route post api/profile
//@desc create or update profile
//@access Private
router.post('/', [auth, [
    check('status', 'status harus diisi').not().isEmpty(),
    check('skills', 'skills harus diisi').not().isEmpty(),
]], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }

    const {
         bio,status, location,
         website, company, skills,
         githubusername, youtube,facebook,
         twitter, instagram,linkedin} = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company)profileFields.company = company;
    if(website)profileFields.website = website;
    if(location)profileFields.location = location;
    if(bio)profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(bio)profileFields.bio=bio;
    if(githubusername)profileFields.githubusername=githubusername;
    if(skills){
            profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    // console.log(profileFields.skills);
    // res.send(profileFields.skills);

    profileFields.social = {};
    if(youtube)profileFields.social.youtube = youtube;
    if(facebook)profileFields.social.facebook = facebook;
    if(twitter)profileFields.social.twitter = twitter;
    if(instagram)profileFields.social.instagram = instagram;
    if(linkedin)profileFields.social.linkedin = linkedin;

    try{
        //cek jika ada profile di database
        let profile = await Profile.findOne({ user : req.user.id});
        //jika sudah ada profile
        if(profile){
            profile = await Profile.findOneAndUpdate({ user : req.user.id},{ $set : profileFields},{ new : true});

            return res.json(profile);
        }

        //jika belum ada buat profile baru
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }

})


//@route get api/profile
//@desc get all profile
//@access Public

router.get('/', async (req, res)=>{
    try{
        const profiles = await Profile.find().populate('User',['name','avatar']);
        res.status(200).json(profiles);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
})

//@route get api/profile/user/user_id
//@desc get profile by id
//@access Public
router.get('/user/:user_id', async (req, res)=>{
    try{
        const profile = await Profile.find({ user : req.params.user_id }).populate('User',['name','avatar']);
        if(!profile){
            return res.status(400).json({ msg :  'profile tidak ditemukan'})
        }
        res.status(200).json(profile);
    }catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg :  'profile tidak ditemukan'})
        }

       // console.log(err.message);
        res.status(500).send('server error');
    }
})

//@route delete api/profile/user/user_id
//@desc delete  profile user, posts
//@access Purivate
router.delete('/', auth, async(req, res)=>{
    try{
        //remove profile
        await Profile.findOneAndRemove({ user : req.user.id });

        //remove user
        await Profile.findOneAndRemove({ _id : req.user.id });
        
        res.status(200).json({ msg : req.user.id + ' id berhasil dihapus'});
    }catch(err){
        
        console.log(err.message);
        res.status(500).send('server error');
    }
})

//@route  put api/profile/experience/
//@desc update  experience
//@access Purivate

router.put('/experience', [auth, 
    [
        check('title', 'title harus diisi').not().isEmpty(),
        check('company', 'company harus diisi').not().isEmpty(),
        check('from', 'dari tanggal berapa harus diisi').not().isEmpty()
      
    ]
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
            res.status(400).json({ errors : errors.array() })
    }

    const {
        title, company, location, from, to, current, description
    } = req.body;

    const newExp = {
        title, company, location, from, to, current, description
    }

    try{
        const profile = await Profile.findOne({ user : req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.status(200).json(profile);
        
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
})


//@route  delet4 api/profile/experience/exp_id
//@desc delete experience
//@access Private
router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try{
        //cek profile
        const profile = await Profile.findOne({ user : req.user.id});
       
        //looping remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.status(200).json(profile);

        
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }

})
module.exports = router; 

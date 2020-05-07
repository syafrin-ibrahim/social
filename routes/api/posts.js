const express = require('express');
const router = express.Router();
const  { check , validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


//@route  post api/posts
//@desc  create post
//@access Private
router.post('/', [auth, [
    check('text' , 'Text harus diisi').not().isEmpty()
]
], async (req, res)=> {
    const errors = validationResult(req);
    if(! errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }

    try{
        //retrieve user without password
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        });
        
        const post = await newPost.save();
        res.status(200).json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts
// @desc    Get all posts 
// @access  Private
router.get('/', auth, async (req, res)=>{
    try{
        const posts = await Post.find().sort({ Date : -1});
        res.status(200).json(posts); 
    }catch(err){
        console.error(err.message);
        res.status(400).send("Server error ...")
    }
})

// @route   GET api/posts/:id
// @desc    Get single posts 
// @access  Private
router.get('/:id', auth, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({
                msg : 'Page Not FOund'
            });

        }
        res.status(200).json(post); 
    }catch(err){
        //console.error(err.message);
        if(err.kind === 'ObjectId'){
           return res.status(404).json({ msg : 'Post Not Found' })
        }
        res.status(500).send("Server error ...")
    }
})


// @route  delete api/posts/:id
// @desc    delete single posts 
// @access  Private
router.delete('/:id', auth, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({
                msg : 'Page Not FOund'
            });

        }

        //cek user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg : 'User Not Authorized'});
        }
        
        await post.remove();
        res.json({ msg : 'post removed'})
    }catch(err){
        //console.error(err.message);
        if(err.kind === 'ObjectId'){
           return res.status(404).json({ msg : 'Post Not Found' })
        }
        res.status(500).send("Server error ...")
    }
})

// @route  put api/posts/like/:id
// @desc    like single posts 
// @access  Private
router.put('/like/:id', auth, async (req, res )=>{
       try{
            const post = await Post.findById(req.params.id);

            //cek apa sudah dilike post sebelumnya
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ){
                return res.status(400).json({ msg : 'Post Already Liked'})
            }

            post.likes.unshift({ user : req.user.id });

            await post.save();
            res.status(200).json(post.likes);
       }catch(err){
           console.log(err.message);
           res.status(500).send("Server Error");

       }
});


// @route  put api/posts/unlike/:id
// @desc    unlike single posts 
// @access  Private
router.put('/unlike/:id', auth, async (req, res )=>{
       try{
            const post = await Post.findById(req.params.id);

            //cek apa sudah dilike post sebelumnya
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
                return res.status(400).json({ msg : 'Post has not been Liked'})
            }

            //get rwmove likes
            const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            await post.save();
            res.status(200).json(post.likes);
           
       }catch(err){
           console.log(err.message);
           res.status(500).send("Server Error");

       }
});

// @route  add comment  api/posts/comment/:postid
// @desc    add comment 
// @access  Private return res.status(400).json({ errors : errors.array()})
router.post('/comment/:id', [auth, [check('text','text harus diisi').not().isEmpty()]],
            async (req, res)=>{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(400).json({ errors : errors.array()})
                }

                try{
                      const user = await User.findById(req.user.id).select('-password');
                      const post = await Post.findById(req.params.id)
                      const newComment = {
                          text : req.body.text,
                          name : user.name,
                          avatar : user.avatar,
                          user : req.user.id
                      }

                      post.comments.unshift(newComment);
                      await post.save();

                      res.json(post.comments);

                }catch(err){
                    console.log(err.message)
                    res.status(500).send('Server Error');
                }
 });


 // @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
 
            try {
                const post = await Post.findById(req.params.id);
                // Pull out comment
                const comment = post.comments.find(
                comment => comment.id === req.params.comment_id
                );
                // Make sure comment exists
                if (!comment) {
                return res.status(404).json({ msg: 'Comment does not exist' });
                }
                // Check user
                if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
                }
                // Get remove index
                const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
                post.comments.splice(removeIndex, 1);
                await post.save();
                res.json(post.comments);
        } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
        
        }
    
   });



module.exports = router; 

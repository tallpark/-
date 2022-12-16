const express = require("express");
const router = express.Router();

const Post = require("../schemas/post.js");
router.post("/post", async (req,res) => {
    const {postId, name, password, title, content} = req.body;

    const post = Post.find({postId});

    if(post.length){
        return res.status(400).json({
            success:false,
            errorMessage:"이미 존재하는 ID입니다."
        })
    }
    await Post.create({postId, name, password, title, content});
    res.json({message : "게시글을 생성하였습니다."});
})

router.get("/post", async(req,res) => {
    const post = await Post.find({},{"content":0, "password":0}).sort({"createdAt":-1})

    const results = post.map((post) => {
        return ({
            postId : post.postId,
            name : post.name,
            title : post.title,
            createdAt : post.createdAt
        })
    });
    res.json({results})
});

module.exports = router;
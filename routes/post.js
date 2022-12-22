const express = require("express");
const router = express.Router();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const Post = require("../schemas/post.js");

// 게시물 작성
router.post("/", async (req,res) => {
    try {
        const {title, name, password, content} = req.body;
        if (title.length === 0) {
            return res.status(400).json({"message": "제목 입력"});
        }
        await Post.create({title, name, password, content});
        res.status(200).json({"message": "게시글 생성"});
    } catch(err) {
        return res.status(400).json({"message": "데이터 형식 오류"});
    }
});

// 전체 게시글 목록 조회
router.get("/", async (req, res) => {
    const post = await Post.find({},{"__v":0, "content":0, "password":0}).sort({"createdAt":-1})

    const results = post.map((post) => {
        return ({
            postId : post._id,
            title : post.title,
            name : post.name,
            createdAt : moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")
        })
    });
    res.json({results})
});

// 게시글 상세 조회
router.get("/:postId", async(req,res) => {
    try {
        const {postId} = req.params;

        const post = await Post.findOne({postId:postId});

        const postDetail = {
            postId : post._Id,
            title : post.title,
            name : post.name,
            content : post.content,
            createdAt : moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")
        }
        res.json({postDetail})
    } catch(err) {
        return res.status(400).json({"message":"데이터 형식 오류"})
    }
});

// 게시글 수정
router.put("/:postId", async(req,res) => {
    try {
        const {postId} = req.params;
        const {password, title, content} = req.body;

        const post = await Post.findOne({postId:postId})
        if (password !== post.password) {
            return res.status(400).json({
            succes : false,
            errorMessage: "비밀번호 오류"
        })
    }
    await Post.updateOne({postId:postId}, {$set: {title:title, content,content}});
    return res.status(200).json({"message": "게시글 수정 완료"})
    } catch(err) {
        return res.status(400).json({"message":"데이터 형식 오류"})
    }
})

//게시물 삭제
router.delete("/:postId", async(req,res) => {
    try{
        const {postId} = req.params;
        const {password} = req.body;

        const post = await Post.findOne({postId:postId});
        if (password !== post.password) {
            return res.status(400).json({
                succes : false,
                errorMessage: "비밀번호 오류"
            })
        }
        if(!Post) {
            return res.status(400).json ({
                succes: false,
                errorMessage: "데이터 조회 실패"
            })
        }
        await Post.deleteOne({postId:postId});
        return res.status(200).json({"message":"게시글 삭제"})
    } catch(err) {
        return res.status(400).json({"message":"데이터 형식 오류"})
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const Post = require("../schemas/post.js")
const Comment = require("../schemas/comment.js");

// 댓글 작성
router.post("/:postId", async (req,res) => {
    try {
        const {postId, name, comment, password} = req.body;
        if (comment.length === 0) {
            return res.status(400).json({"message": "댓글 입력"});
        }
        await Comment.create({postId, name, comment, password});
        res.status(200).json({"message": "댓글 생성"})
    } catch(err) {
        return res.status(400).json({"message": "데이터 형식 오류"})
    }
})

// 댓글 목록 조회
router.get("/:postId", async (req,res) => {
    const comment = await Comment.find({},{"password":0}).sort({"createdAt":-1})

    const list = comment.map((comment) =>{
        return ({
            commentId : comment._id,
            name : comment.name,
            comment : comment.comment,
            createdAt : moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        })
    });
    res.json({list})
});

// 댓글 수정
router.put("/:commentId", async(req,res) => {
    try {
        const {commentId} = req.params;
        const {name, comment, password} = req.body;
     
        const com = await Comment.findOne({_id:commentId})
        if (password !== com.password) {
            return res.status(400).json({
            succes : false,
            errorMessage: "비밀번호 오류"
        })
    }
    await Comment.updateOne({commentId:commentId}, {$set: {name:name, comment:comment}});
    return res.status(200).json({"message":"댓글 수정 완료"})
    } catch(err) {
        return res.status(400).json({"message":"데이터 형식 오류"})
    }
})

// 댓글 삭제
router.delete("/:commentId", async(req, res) => {
    try {
        const {commentId} = req.params;
        const {password} = req.body;

        const com = await Comment.findOne({_id:commentId})
        if (password !== com.password) {
            return res.status(400).json({
                succes : false,
                errorMessage: "꺼져"
            })
        }
        if(!Comment) {
            return res.status(400).json ({
                succes: false,
                errorMessage: "데이터 조회 실패"
            })
        }
        await Comment.deleteOne({_id:commentId});
        return res.status(200).json({"message":"댓글 삭제"})
    } catch(err) {
        return res.status(400).json({"message":"데이터 형식 오류"})
    }    
})

module.exports = router;
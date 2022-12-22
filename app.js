const express = require('express');
const app = express();
const port = 3000;

const postRouter = require("./routes/post.js");
const commentRouter = require("./routes/comment.js");

const connect = require("./schemas");
connect();

app.use(express.json());

app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.get('/', (req, res) => {
  res.send('기본 페이지')
})

app.listen(port, () => {
  console.log(port, '서버 열림');
});
const express = require('express');
const app = express();
const port = 3000;

const post_writeRouter = require('./routes/post.js');
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", post_writeRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
// @ts-check

const express = require('express'); // express 켜기
const cors = require('cors'); // cors 켜기

const PORT = 4000; // 포트번호 설정
const app = express(); // 실행시킨 express를 app 에 담아주기

const indexRouter = require('./routes'); // = require('./routes/index');
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

app.use(cors()); // cors를 미들웨어로 넣어주기
app.set('view engine', 'ejs');
app.use(express.static('public')); // 스태틱 설정(접근가능한 파일들)
app.use(express.json()); // 바디파서 설정 (1)
app.use(express.urlencoded({ extended: false })); // 바디파서 설정 (2)

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
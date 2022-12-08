// @ts-check

const express = require('express');

const db = require('../controllers/mysqlController');
const mongooseDB = require('../controllers/mongooseController');

const router = express.Router();

router.get('/', (req, res) => {
  const str = `쿼리로 받은 id 값은 ${req.query.id} password 값은 ${req.query.password} 입니다.`;
  const json = JSON.stringify(str);
  res.send(json);
});

router.get('/id/:id', (req, res) => {
  const str = `파라미터로 받은 id 값은 ${req.params.id} 입니다.`;
  const json = JSON.stringify(str);
  res.send(json);
});
router.post('/', (req, res) => {
  const str = `Form 태그로 부터 받은 id값은 ${req.body.id}, password 값은 ${req.body.password} 입니다.`;
  const json = JSON.stringify(str);
  res.send(json);
});

// mysql login 을 위한 라우터
router.post('/login', (req, res) => {
  db.getUser(req.body.id, (data) => {
    if (data.length > 0) {
      if (data[0].PASSWORD === req.body.password) {
        // 세션에 저장
        req.session.login = true;
        req.session.userId = req.body.id;

        res.send(`${req.session.userId}님이 로그인 하셨습니다.`);
      } else {
        res.status(400);
        res.send('비밀번호가 다릅니다.<br><a href="/">로그인으로 이동</a>');
      }
    } else {
      res.status(400);
      res.send(
        '회원 ID를 찾을 수 없습니다.<br><a href="/">로그인으로 이동</a>',
      );
    }
  });
});

// mongoose login 을 위한 라우터
router.post('/login/mongoose', async (req, res) => {
  try {
    const findUser = await mongooseDB.getUser(req.body.id);
    if (findUser) {
      if (findUser.password === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;

        res.send(`${req.session.userId}님이 로그인 하셨습니다.`);
      } else {
        res.status(400);
        res.send('비밀번호가 다릅니다.<br><a href="/">로그인으로 이동</a>');
      }
    } else {
      res.status(400);
      res.send(
        '회원 ID를 찾을 수 없습니다.<br><a href="/">로그인으로 이동</a>',
      );
    }
  } catch (err) {
    console.error(err);
    res.send(`${err}<br><a href="/">로그인으로 이동</a>`);
  }
});

module.exports = router;

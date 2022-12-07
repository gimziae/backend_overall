// @ts-check

const express = require('express');
const { append } = require('express/lib/response');
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

module.exports = router;

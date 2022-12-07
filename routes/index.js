// @ts-check

const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { name: 'GIMZIAE' });
});

router.get('/fetch', (req, res) => {
  res.send(JSON.stringify('프론트로부터 요청이 왔어요!'));
});

module.exports = router;

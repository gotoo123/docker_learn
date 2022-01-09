var express = require('express');
var router = express.Router();
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
})

router.get('/', async (req, res) => {
  const count =  Number(await redis.get('count'));
  res.json({count});
});

router.post('/', async(req, res) => {
  const count = Number(await redis.get('count'));
  await redis.set('count', count + 1);
  res.json({count: count + 1});
})

module.exports = router;

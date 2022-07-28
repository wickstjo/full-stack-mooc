const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

    const previous = await redis.getAsync('amount') || 0
    await redis.setAsync('amount', Number(previous) + 1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

module.exports = router;
const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
    const item = await req.todo
    res.send(item)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {

    const result = await Todo.updateOne({
        _id: req.todo._id
    }, req.body)

    res.send(result);
});

router.use('/:id', findByIdMiddleware, singleRouter)

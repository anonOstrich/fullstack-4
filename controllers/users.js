const usersRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body
    if(body.password && body.password.length < 3){
      return response.status(400).json({ error: 'Validation error: password must be at least 3 characters long '})
    }
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash: await bcrypt.hash(body.password, 10)
    })
    await newUser.save()
    response.json(newUser.toJSON())
  } catch (exception){
    next(exception)
  }
})


module.exports = usersRouter
// const usersRouter = require("./usersRouter");
const userRouter = require('./user')
const productRouter = require('./product');

const router = require('express').Router();

// Type router here ⬇️
// EXAMPLE : router.use("/users", usersRouter);
router.use('/user', userRouter)
router.use('/product', productRouter)

module.exports = router;
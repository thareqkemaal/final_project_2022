// const usersRouter = require("./usersRouter");
const userRouter = require('./user')
const productRouter = require('./product');
const addressRouter = require('./address');

const router = require('express').Router();

// Type router here ⬇️
// EXAMPLE : router.use("/users", usersRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/address', addressRouter);

module.exports = router;
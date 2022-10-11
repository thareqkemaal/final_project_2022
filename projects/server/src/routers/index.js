// const usersRouter = require("./usersRouter");
const userRouter = require('./user')
const productRouter = require('./product');
const addressRouter = require('./address');
const rajaOngkirRouter = require('./rajaongkir');
const transactionRouter = require('./transaction');

const router = require('express').Router();

// Type router here ⬇️
// EXAMPLE : router.use("/users", usersRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/address', addressRouter);
router.use('/rajaongkir', rajaOngkirRouter);
router.use('/transaction', transactionRouter);

module.exports = router;
// const usersRouter = require("./usersRouter");
const userRouter = require('./user')

const router = require('express').Router();

// Type router here ⬇️
// EXAMPLE : router.use("/users", usersRouter);
router.use('/user',userRouter)

module.exports = router;
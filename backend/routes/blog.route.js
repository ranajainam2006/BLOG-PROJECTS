const blogController = require('../controllers/blog.controller')
const router = require('express').Router()
const upload = require('../utils/upload')
const { verifyAuth } = require("../middleware/verify")

router
    .route('/')
    .post( verifyAuth  ,upload.single('b_image'), blogController.store)
    .get( verifyAuth  ,blogController.index)
    .put(upload.single('b_image'), blogController.update)

router
    .route('/:id')
    .delete(blogController.trash)

    
module.exports = router
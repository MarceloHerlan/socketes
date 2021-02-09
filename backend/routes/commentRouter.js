const router=require('express').Router()
const commentController=require('../controllers/commentController')

router.get('/comments/:id',commentController.getComments)

module.exports=router
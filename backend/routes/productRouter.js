const router=require('express').Router()
const productController=require('../controllers/productController')


router.get('/products',productController.getProducts)
router.patch('/products/:id',productController.reviews)

module.exports=router
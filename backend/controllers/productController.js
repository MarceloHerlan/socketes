const Products=require('../models/productModel')

const productController={
    getProducts:async(req,res)=>{
        try {
            const products=await Products.find()
            res.json({products})

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    reviews:async(req,res)=>{
        try {
            const{rating} =req.body 

            if(rating && rating !==0){
                const product=await Products.findById(req.params.id)
                if(!product) return res.status(400).json({msg:'Product doesn exist'})

                let num=product.numReviews
                let rate=product.rating

                await Products.findByIdAndUpdate({_id:req.params.id},{
                    rating:rate+rating,numReviews:num+1
                })
                res.json({msg:'Update success'})
    
            }
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports=productController
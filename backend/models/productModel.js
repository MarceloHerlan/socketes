const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:String,
    price:String,
    images:Object,
    description:String,
    numReviews:Number,
    rating:Number
},{
    timestamps:true
})

module.exports=mongoose.model('Products',productSchema)
import React, { useContext } from 'react'
import {DataContext} from '../../GoblalState'
import ProductCard from './ProductCard'

const Products = () => {
    const state=useContext(DataContext)
    const [products]=state.products

    return (
    <>
        <h2 className="app_title">Website MERN and Socket io</h2>
        <div className='products_page'>         
            {
                products.map(product=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            }           
            
        </div>
    </>    
    )
}

export default Products

import React from 'react';
import { getProducts } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export default function Products() {
    const { 
        isLoading,
        error,
        data: products 
    } = useQuery(['products'], getProducts);
    
    return (
        <>
            {isLoading && <p>loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {
                    products && products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
                <li></li>
            </ul>
        </> 
    )
}
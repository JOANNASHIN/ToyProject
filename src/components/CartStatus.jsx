import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCart from '../hooks/useCart';

export default function CartStatus() {
    const { 
        cartQuery: { data: products }
     } = useCart();

    return (
        <div className='relative'>
            <AiOutlineShoppingCart className='text-3xl' />
            {products && <span className='w-5 h-5 text-center bg-brand text-sm text-white font-bold rounded-full absolute -top-1 -right-2'>{products.length}</span>}
        </div>
    )
}
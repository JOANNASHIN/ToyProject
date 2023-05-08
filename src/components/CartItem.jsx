import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { removeFromCart, updateToCart } from '../api/firebase';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function CartItem({ 
    product,
    product: {id, image, title, option, quantity, price},
    uid
}) {
    const handleMinus = () => {
        if (quantity < 2) return;

        updateToCart(uid, {
            ...product,
            quantity: quantity - 1,
        })
    }

    const handlePlus = () => {
        updateToCart(uid, {
            ...product,
            quantity: quantity + 1,
        })
    }

    const handleDelete = () => {
        removeFromCart(uid, id);
    }

    return (
        <li className='flex justify-between my-2 items-center'>
            <figure className='w-24 md:w-48 mr-4'>
                <img className='rounded-lg' src={image} alt={title} />
            </figure>
            <div className='flex flex-1 justify-between'>
                <div className='basis-3/5'>
                    <p className='text-lg'>{title}</p>
                    <p className='text-xl font-bold text-brand'>{option}</p>
                    <p>₩{price}</p>
                </div>
                <div className='text-2xl flex items-center'>
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
                    <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete}/>
                </div>
            </div>
        </li>
    )
}
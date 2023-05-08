import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;

function MyCart() {
    const { uid } = useAuthContext();
    const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

    if (isLoading) return <p>loading...</p>;

    const hasProducts = products && products.length;
    const totalPrice = products.reduce((acc, cur) => {
        return acc + (parseInt(cur.price) * cur.quantity);
    }, 0)

    return (
        <section>
            <p>My Cart</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
            {hasProducts && (
                <>
                    <ul>
                        {products && products.map(product => 
                            <CartItem key={product.id} product={product} uid={uid}/>
                        )}
                    </ul>

                    <div>
                        <PriceCard text="상품 총액" price={totalPrice} />
                        <BsFillPlusCircleFill />
                        <PriceCard text="배송액" price={SHIPPING} />
                        <FaEquals />
                        <PriceCard text="총 가격" price={totalPrice + SHIPPING} />
                    </div>
                </>
            )}
        </section>
    )
}

export default MyCart;
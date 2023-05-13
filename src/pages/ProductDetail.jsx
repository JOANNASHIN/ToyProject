import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { login } from '../api/firebase';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
    const { user } = useAuthContext();

    /**
     * location 이동시에 받아오는 데이터 (productCard 참고)
     */
    const {
        state: {
            product: {id, image, title, description, category, price, options}
        } 
    } = useLocation();

    /**
     * default 옵션
     */
    const [selected, setSelected] = useState(options && options[0]);

    /**
     * cart hooks
     */
    const { 
        updateToCart
    } = useCart();

    /**
     * 옵션 선택 이벤트
     */
    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    /**
     * 장바구니 담기 성공 여부
     */
    const [success, setSuccess] = useState();

    /**
     * 장바구니 담기 이벤트
     */
    const handleCart = (e) => {
        // 비로그인 체크
        if (!user) {
            const goToLogin = window.confirm('로그인 후 가능합니다.\n로그인 하시겠습니까?');
            if (goToLogin) login();
            return;
        }

        // 넘길 데이터
        const product = {
            id,
            image,
            title,
            price,
            option: selected,
            quantity: 1,
        }
        
        //장바구니 추가로직
        updateToCart.mutate(product, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.');
                setTimeout(() => setSuccess(''), 3000);
            }
        });
    }

    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>

            <section className='flex flex-col md:flex-row p-4'>
                <figure className='w-full px-4 basis-7/12'>
                    <img className='w-full' src={image} alt={title} />
                </figure>

                <div className='w-full basis-5/12 flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2'>
                        {title}
                    </h2>
                    <p className='text-2xl font-bold py-2 border-b border-gray-400'>₩{price}</p>
                    <p className='py-4 text-lg'>{description}</p>
                    <div className='flex items-center'>
                        <label htmlFor='select' className='text-brand font-bold'>옵션</label>
                        <select id='select' className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' onChange={handleSelect} value={selected}>
                            {options && options.map((option, index) => (
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                    
                    { success && <p className='my-2'>✅{success}</p>}
                    <Button text='장바구니에 추가' onClick={handleCart}></Button>
                </div>
            </section>
        </>
    )
}

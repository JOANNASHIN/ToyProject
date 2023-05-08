import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState('');

    const queryClient = useQueryClient();
    const addProduct = useMutation(({product, url}) => addNewProduct(product, url), {
        onSuccess: () => queryClient.invalidateQueries(['products'])
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if (name === 'file') {
            setFile(files && files[0])
            return;
        }
        setProduct((product) => ({...product, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file)
            .then(url => {
                addProduct.mutate({product, url}, {onSuccess: () => {
                    setSuccess('성공적으로 제품이 추가되었습니다.');
                    setTimeout(() => {
                        setSuccess('');
                    }, 4000)
                }})
               
                //firebase에 URL 추가
                // addNewProduct(product, url)
                //     .then(() => {
                //         setSuccess('성공적으로 제품이 추가되었습니다.');
                //         setTimeout(() => {
                //             setSuccess('');
                //         }, 4000)
                //     });
            })
            .finally(() => {
                setIsUploading(false);
            });


    }

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>New Product</h2>


            {/* 첨부 이미지 미리보기 */}
            {file && (
                <img 
                    src={URL.createObjectURL(file)} 
                    alt='local file'
                    className='w-96 mx-auto mb-2'
                />
            )}

            {/* 성공메세지 */}
            {success && <p className='my-2'>✅{success}</p>}
            
            {/* 제품 등록 폼 */}
            <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept='image/*'
                    name="file"
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="title"
                    value={product.title ?? ''}
                    placeholder='제품명'
                    required
                    onChange={handleChange}
                />
                <input 
                    type="number" 
                    name="price"
                    value={product.price ?? ''}
                    placeholder='가격'
                    required
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="category"
                    value={product.category ?? ''}
                    placeholder='카테고리'
                    required
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="description"
                    value={product.description ?? ''}
                    placeholder='제품 설명'
                    required
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="options"
                    value={product.options ?? ''}
                    placeholder='옵션들 콤마(,)로 구분'
                    required
                    onChange={handleChange}
                />

                <Button 
                    text={isUploading? '제품 등록 중' : '제품 등록하기'}
                    disabled={isUploading}
                ></Button>
            </form>
        </section>
    )
}

export default NewProduct;
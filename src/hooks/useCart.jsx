import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCart as fetchCart, removeFromCart as fetchRemoveFromCart, updateToCart as fetchUpdateToCart, } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();

    /**
     * cart 개수
     */
    // const getCart = useQuery(['carts'], () => fetchCart(uid));
    
    /**
     * login 여부에 따라 구분
     */
    const cartQuery = useQuery(
        ['carts', uid || ''],
        () => fetchCart(uid), 
        {
            enabled: !!uid
        }
    )

    /**
     * cart update
     */
    const updateToCart = useMutation(
        (product) => fetchUpdateToCart(uid, product),
        {
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        },
        }
    );

    /**
     * cart remove
     */
    const removeFromCart = useMutation((id) => fetchRemoveFromCart(uid, id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        },
    });

    return { cartQuery, updateToCart, removeFromCart };
}

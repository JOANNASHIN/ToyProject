import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({children, requireAdmin}) {
    const { user } = useAuthContext();
    console.log('여기서 체크')

    // 체크 전
    if (user === undefined) return;

    // 비로그인 유저거나 어드민권한이 있는곳에 어드민 권한이 없는 경우 홈으로 리다이렉트
    if (!user || (!user.isAdmin && requireAdmin)) {
        return <Navigate to="/" replace></Navigate>
    } 

    return children;
}

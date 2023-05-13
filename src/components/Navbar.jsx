import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { login, logout, onUserStateChange } from '../api/firebase';
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

function Navbar () {
    const { user, login, logout } = useAuthContext();
    // const [user, setUser] = useState();
    
    // useEffect(() => {
    //     onUserStateChange(setUser);
    // }, [])

    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to="/" className="flex items-center text-4xl text-brand">
                <FiShoppingBag></FiShoppingBag>
                Shoppy
            </Link>

            <nav className="flex items-center gap-4 font-semibold">
                <Link to="/products">Products</Link>
                {user && 
                    <Link to="/cart">
                        <CartStatus />
                    </Link>
                }
                {user && user.isAdmin && (
                        <Link to="/products/new">
                            New Product
                        </Link>
                    )
                }

                {user && <User user={user}/>}
                {!user && <Button text={'Login'} onClick={login}>Login</Button>}
                {user && <Button text={'Logout'} onClick={logout}>Logout</Button>}
                
            </nav>
        </header>
    )
}

export default Navbar;

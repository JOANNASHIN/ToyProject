import { Link } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import CartStatus from "./CartStatus";
import { FiShoppingBag } from "react-icons/fi";
import { useAuthContext } from "../context/AuthContext";

function Navbar () {
    const { user, login, logout } = useAuthContext();

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

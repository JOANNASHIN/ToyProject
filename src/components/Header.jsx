import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

function Header () {
    return (
        <header>
            <Link to="/">
                <FiShoppingBag></FiShoppingBag>
                Shoppy
            </Link>

            <nav>
                <Link to="/products">All Products</Link>
                <Link to="/products/new">New Products</Link>
                <Link to="/cart">My Cart</Link>
            </nav>
        </header>
    )
}

export default Header;

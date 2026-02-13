import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const totalItems = getTotalCartItems();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    ShopApp
                </Link>
                <div className="flex space-x-6 items-center">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                    <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Products</Link>
                    <Link to="/support" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Support</Link>
                    <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { products } from '../data/products';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount(products);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Keranjang Belanja</h2>

            {totalAmount > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow">
                        {products.map((product) => {
                            if (cartItems[product.id] !== 0) {
                                return (
                                    <div key={product.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                                <p className="text-gray-500">{formatCurrency(product.price)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                            <button onClick={() => removeFromCart(product.id)} className="p-1 hover:text-red-500 transition-colors">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <input
                                                value={cartItems[product.id]}
                                                onChange={(e) => updateCartItemCount(Number(e.target.value), product.id)}
                                                className="w-12 text-center bg-transparent font-medium focus:outline-none"
                                            />
                                            <button onClick={() => addToCart(product.id)} className="p-1 hover:text-indigo-600 transition-colors">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>
                            <div className="flex justify-between mb-4 text-gray-600">
                                <span>Pengiriman</span>
                                <span>Gratis</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
                                <span>Total</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                                >
                                    Lanjut ke Checkout
                                </button>
                                <Link to="/products" className="w-full text-center text-indigo-600 font-medium hover:text-indigo-800">
                                    Lanjut Belanja
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trash2 className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Keranjang Anda kosong</h3>
                    <p className="text-gray-500 mb-8">Sepertinya Anda belum menambahkan apapun ke keranjang.</p>
                    <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                        Mulai Belanja
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;

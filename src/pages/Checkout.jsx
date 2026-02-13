import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { products } from '../data/products';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

const Checkout = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount(products);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Mock payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            checkout();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Payment Successful!</h2>
                <p className="text-gray-600 mb-8 text-lg">Thank you for your purchase. Your order has been confirmed.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h2>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        Payment Details
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        <div className="border-t pt-4 mt-6">
                            <h4 className="text-lg font-semibold mb-4 text-gray-800">Card Information</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        required
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expDate"
                                            placeholder="MM/YY"
                                            required
                                            value={formData.expDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            required
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors mt-6 flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Bayar ${formatCurrency(totalAmount)}`
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
                        <div className="space-y-3 mb-4">
                            {products.map((product) => {
                                if (cartItems[product.id] !== 0) {
                                    return (
                                        <div key={product.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{product.name} (x{cartItems[product.id]})</span>
                                            <span className="font-medium text-gray-800">{formatCurrency(product.price * cartItems[product.id])}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                            <span>Total</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import React from 'react';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700">
                    {product.category}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                    <button
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

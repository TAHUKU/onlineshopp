import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : {};
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
            }
            if (newCart[itemId] === 0) {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newAmount <= 0) {
                delete newCart[itemId];
            } else {
                newCart[itemId] = newAmount;
            }
            return newCart;
        });
    };

    const checkout = () => {
        setCartItems({});
        // Additional checkout logic (e.g., API call) would go here
    };

    const getTotalCartAmount = (products) => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.price;
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let total = 0;
        for (const item in cartItems) {
            total += cartItems[item];
        }
        return total;
    }

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
        getTotalCartItems,
        checkout,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

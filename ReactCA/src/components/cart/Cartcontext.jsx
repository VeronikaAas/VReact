import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const savedCart = JSON.parse(localStorage.getItem('cart'));
		if (savedCart) {
			setCart(savedCart);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id);
			if (existingItem) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
				);
			} else {
				return [...prevCart, { ...product, quantity: 1 }];
			}
		});
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === productId);
			if (existingItem.quantity === 1) {
				return prevCart.filter((item) => item.id !== productId);
			} else {
				return prevCart.map((item) =>
					item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
				);
			}
		});
	};

	const deleteFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	return (
		<CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, deleteFromCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

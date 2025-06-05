import { useCart } from '../../components/cart/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * CheckoutPage displays the user's shopping cart and handles the checkout process.
 *
 * It groups duplicate products by ID, allows users to adjust quantity, and calculates
 * the total price with discounts applied when applicable.
 *
 * Upon confirming checkout, the cart is cleared and the user is redirected to a success page.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * <Route path="/checkout" element={<CheckoutPage />} />
 */

const CheckoutPage = () => {
	const { cart, setCart, addToCart, removeFromCart, deleteFromCart } = useCart();
	const navigate = useNavigate();

	const groupedCart = cart.reduce((acc, item) => {
		const existingItem = acc.find((groupedItem) => groupedItem.id === item.id);
		if (existingItem) {
			existingItem.quantity += item.quantity;
		} else {
			acc.push({ ...item });
		}
		return acc;
	}, []);

	const totalPrice = parseFloat(
		groupedCart.reduce(
			(sum, item) =>
				sum +
				(item.discountedPrice && item.discountedPrice < item.price
					? item.discountedPrice * item.quantity
					: item.price * item.quantity),
			0,
		),
	).toFixed(2);

	const handleCheckout = () => {
		setCart([]);
		navigate('/success');
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-10">
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<div className="bg-white p-6 rounded-md shadow-md text-black">
				<h1 className="text-2xl font-semibold mb-4 text-center">Payment</h1>

				{groupedCart.length === 0 ? (
					<p className="text-center text-gray-600">Your cart is empty.</p>
				) : (
					<div>
						<ul>
							{groupedCart.map((item) => (
								<li
									key={item.id}
									className="border p-4 mb-4 flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-lg shadow-sm"
								>
									<div className="flex-1 min-w-0 mb-4 sm:mb-0">
										<strong className="block truncate">{item.title}</strong>
										{item.discountedPrice && item.discountedPrice < item.price ? (
											<span>
												<span className="text-gray-500 line-through mr-2">{item.price} kr</span>
												<span className="text-red-600 font-bold">{item.discountedPrice} kr</span>
											</span>
										) : (
											<span>{item.price} kr</span>
										)}
									</div>

									<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-2">
										<div className="flex items-center">
											<button
												aria-label="Reduce item by one"
												onClick={() => removeFromCart(item.id)}
												className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-700"
											>
												-
											</button>
											<span className="mx-4 text-lg font-bold">{item.quantity}</span>
											<button
												aria-label="Add item"
												onClick={() => addToCart(item)}
												className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-700"
											>
												+
											</button>
										</div>
										<button
											aria-label="Remove item"
											onClick={() => deleteFromCart(item.id)}
											className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
										>
											Remove
										</button>
									</div>
								</li>
							))}
						</ul>

						<p className="font-bold mt-4 text-center text-lg">Total: {totalPrice} kr</p>

						<button
							aria-label="Ready to pay"
							onClick={handleCheckout}
							className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-700 w-full cursor-pointer"
							style={{ backgroundColor: '#ca8a04' }}
						>
							Ready to pay
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutPage;

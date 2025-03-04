import { useCart } from "../../components/cart/Cartcontext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {
    const { cart, setCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = parseFloat(
        cart.reduce((sum, item) => sum + Number(item.discountedPrice && item.discountedPrice < item.price ? item.discountedPrice : item.price), 0)
    ).toFixed(2);
    
    const handleCheckout = () => {
        setCart([]); 
        navigate("/success"); 
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-10">
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
                <h1 className="text-2xl font-semibold mb-4 text-center">Payment</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id} className="border p-4 mb-4 flex justify-between items-center bg-gray-50 rounded-lg shadow-sm">
                                    <div>
                                        <strong>{item.title}</strong> <br />
                                        {item.discountedPrice && item.discountedPrice < item.price ? (
                                            <span>
                                                <span className="text-gray-500 line-through mr-2">{item.price} kr</span>
                                                <span className="text-red-600 font-bold">{item.discountedPrice} kr</span>
                                            </span>
                                        ) : (
                                            <span>{item.price} kr</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-700 cursor-pointer">
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <p className="font-bold mt-4 text-center text-lg">Total: {totalPrice} kr</p>

                        <button
                            onClick={handleCheckout}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-700 w-full cursor-pointer"
                            style={{ backgroundColor: "#ca8a04" }}>
                            Ready to pay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;

import { useCart } from "../../components/cart/Cartcontext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const { cart, setCart } = useCart();
    const navigate = useNavigate();

    // Beregn totalpris med rabatt der det er aktuelt
    const totalPrice = parseFloat(
        cart.reduce((sum, item) => sum + Number(item.discountedPrice && item.discountedPrice < item.price ? item.discountedPrice : item.price), 0)
    ).toFixed(2);

    // Håndter fullføring av kjøp
    const handleCheckout = () => {
        setCart([]); // 🚀 Tømmer handlekurven
        navigate("/success"); // 🚀 Sender til suksess-siden
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md text-black">
            <h1 className="text-2xl font-semibold mb-4">Payment</h1>

            {cart.length === 0 ? (
                <p>Handlekurven din er tom.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="border p-4 mb-4">
                                <strong>{item.title}:</strong> <br></br> 
                                {item.discountedPrice && item.discountedPrice < item.price ? (
                                    <span>
                                        <span className="text-gray-500 line-through mr-2">{item.price} kr</span>
                                        <span className="text-red-600 font-bold">{item.discountedPrice} kr</span>
                                    </span>
                                ) : (
                                    <span>{item.price} kr</span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <p className="font-bold mt-4">Totalpris: {totalPrice} kr</p>

                    <button
                        onClick={handleCheckout}
                        className="bg-yellow-600 text-black px-4 py-2 rounded mt-4 hover:bg-yellow-800"
                        style={{ backgroundColor: "#ca8a04" }} >Ready to pay
                    </button>

                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
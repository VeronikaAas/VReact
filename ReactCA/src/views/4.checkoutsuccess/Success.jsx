import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
    return (
        <div className="p-6 max-w-lg mx-auto bg-white text-black shadow-md rounded-md text-center">
            <h1 className="text-2xl font-semibold">Order complete!</h1>
            <p className="mt-4">Thank you for your order! We will ship it out shortly.</p>

            <Link to="/">
                <button className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
                    Back to the store
                </button>
            </Link>
        </div>
    );
}

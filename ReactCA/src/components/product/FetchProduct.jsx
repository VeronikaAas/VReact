import { Link } from "react-router-dom";

const Product = ({ product, addToCart }) => {
    if (!product || !product.id) {
        return null;
    }

    const imageUrl = product.image?.url || "https://via.placeholder.com/300";
    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

    return (
        <div className="bg-sky-300 border border-sky-500 p-4 rounded-lg shadow-lg w-full min-h-[280px]">
            <div className="bg-white p-4 rounded-lg shadow-md text-black">

                <h2 className="text-lg font-semibold text-center">{product.title}</h2>

                <Link to={`/product/${product.id}`} className="flex justify-center">
                    <img
                        src={imageUrl}
                        alt={product.image?.alt || "Produktbilde"}
                        className="w-52 h-52 object-cover rounded cursor-pointer"
                    />
                </Link>

                {/* Price/discount */}
                <p className="text-center mt-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-gray-500 line-through text-lg mr-2">{product.price} kr</span>
                            <span className="text-red-600 font-extrabold text-2xl">{product.discountedPrice} kr</span>
                        </>
                    ) : (
                        <span className="font-bold text-lg">{product.price} kr</span>
                    )}
                </p>

                {/* Buttons */}
                <div className="flex justify-between w-full mt-4 gap-x-2">
                    <Link to={`/product/${product.id}`} className="w-1/2 text-center">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-800 w-full cursor-pointer">
                            View product
                        </button>
                    </Link>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-800 w-1/2 cursor-pointer">
                        Add to Cart
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Product;

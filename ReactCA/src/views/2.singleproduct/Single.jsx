import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../components/cart/Cartcontext";
import { StarIcon, TagIcon } from "@heroicons/react/solid";

const Single = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                })
                .catch((error) => console.error("Error fetching product:", error));
        }
    }, [id]);

    if (!product) return <p className="text-center text-gray-500">Loading product...</p>;
    if (!product.data) return <p className="text-center text-red-500">Product not found.</p>;

    return (
        <div className="p-6 text-black min-h-screen flex flex-col items-center">
            <Helmet>
                <title>{product.data.title}</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Produktbilde */}
                    <div className="flex justify-center">
                        <img
                            src={product.data.image?.url}
                            alt={product.data.title}
                            className="w-full max-w-md rounded-lg shadow-md"
                        />
                    </div>
                    {/* Produktinfo */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold text-gray-900">{product.data.title}</h1>
                        <p className="text-gray-600 mt-2">{product.data.description}</p>
                        <p className="mt-4 flex items-center">
                            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                            <strong>Rating:</strong> {product.data.rating}
                        </p>
                        {Array.isArray(product.data.tags) && product.data.tags.length > 0 && (
                            <p className="mt-2 flex items-center">
                                <TagIcon className="h-5 w-5 text-gray-500 mr-1" />
                                <strong>Tags:</strong> {product.data.tags.join(", ")}
                            </p>
                        )}
                        {/* Pris-seksjon */}
                        <div className="mt-6">
                            {product.data.discountedPrice && product.data.discountedPrice < product.data.price ? (
                                <>
                                    <p className="text-gray-500 line-through text-lg">{product.data.price} kr</p>
                                    <p className="text-red-600 text-2xl font-bold">{product.data.discountedPrice} kr</p>
                                </>
                            ) : (
                                <p className="text-gray-900 text-2xl font-bold">{product.data.price} kr</p>
                            )}
                        </div>
                        {/* Kjøpsknapp */}
                        <button
                            className="mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                            onClick={() => addToCart(product.data)}
                        >
                            Legg i handlekurv
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;

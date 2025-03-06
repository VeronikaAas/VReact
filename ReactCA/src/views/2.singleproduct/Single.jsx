import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { StarIcon, TagIcon } from "@heroicons/react/solid";
import { useCart } from "../../components/cart/Cartcontext";

const Single = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart(); 

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
        <div className="max-w-3xl mx-auto p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-10">
            <Helmet>
                <title>{product.data.title}</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product image */}
                    <div className="flex justify-center">
                        <img
                            src={product.data.image?.url}
                            alt={product.data.title}
                            className="w-full max-w-md rounded-lg shadow-md"
                        />
                    </div>
                    {/* Product info */}
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
                        {/* Price/discount */}
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
                        
                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-4">
                            <button
                                onClick={() => addToCart(product.data)}
                                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 w-full font-bold">
                                Add to Cart 
                            </button>

                            <Link to="/" className="w-full text-center">
                                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 w-full font-bold">
                                    Back to homepage
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;

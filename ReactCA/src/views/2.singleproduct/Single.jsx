import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StarIcon, TagIcon } from '@heroicons/react/solid';
import { useCart } from '../../components/cart/Cartcontext';

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
				.catch((error) => console.error('Error fetching product:', error));
		}
	}, [id]);

	if (!product) return <p className="text-center text-gray-500">Loading product...</p>;
	if (!product.data) return <p className="text-center text-red-500">Product not found.</p>;

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-6 sm:mt-10">
			<Helmet>
				<title>{product.data.title}</title>
			</Helmet>
			<div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
					{/* Product image */}
					<div className="flex justify-center">
						<img
							src={product.data.image?.url}
							alt={product.data.title}
							className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-md object-contain"
						/>
					</div>

					{/* Product information  */}
					<div className="flex flex-col justify-between items-center md:items-start text-center md:text-left w-full h-full">
						<h1 className="text-xl sm:text-2xl font-bold text-gray-900">{product.data.title}</h1>
						<p className="text-gray-600 mt-2 text-sm sm:text-base">{product.data.description}</p>

						<p className="mt-4 flex items-center text-sm sm:text-base">
							<StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
							<strong>Rating:</strong> {product.data.rating}
						</p>

						{Array.isArray(product.data.tags) && product.data.tags.length > 0 && (
							<p className="mt-2 flex items-center text-sm sm:text-base">
								<TagIcon className="h-5 w-5 text-gray-500 mr-1" />
								<strong>Tags:</strong> {product.data.tags.join(', ')}
							</p>
						)}

						{/* Price section  */}
						<div className="mt-4 sm:mt-6 min-h-[70px] flex flex-col items-center justify-center">
							{product.data.discountedPrice && product.data.discountedPrice < product.data.price ? (
								<>
									<p className="text-gray-500 line-through text-sm sm:text-lg block">
										{product.data.price} kr
									</p>
									<p className="text-red-600 text-lg sm:text-2xl font-bold block">
										{product.data.discountedPrice} kr
									</p>
								</>
							) : (
								<>
									<p className="text-gray-900 text-lg sm:text-2xl font-bold block">
										{product.data.price} kr
									</p>
									<p className="invisible block">Placeholder</p>
								</>
							)}
						</div>

						{/* Buttons*/}
						<div className="mt-4 sm:mt-6 flex flex-col gap-3 w-full">
							<button
								aria-label="Add to cart"
								onClick={() => addToCart(product.data)}
								className="w-full h-[48px] bg-emerald-500 text-white text-sm sm:text-base rounded-lg hover:bg-emerald-800 font-bold flex items-center justify-center"
							>
								Add to Cart
							</button>

							<Link to="/" className="w-full">
								<button
									aria-label="Back to Homepage"
									className="w-full h-[48px] bg-yellow-500 text-white text-sm sm:text-base rounded-lg hover:bg-yellow-800 font-bold flex items-center justify-center"
								>
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

import { Link } from 'react-router-dom';
import { useCart } from '../cart/Cartcontext';

/**
 * Product component displays a single product card with image, title,
 * price (including optional discount), and buttons to view or add the product to cart.
 *
 * Uses `useCart()` context to add products directly to the shopping cart.
 * Handles missing data gracefully and uses a placeholder image if none is provided.
 *
 * @component
 * @param {{ product: {
 *   id: number,
 *   title: string,
 *   price: number,
 *   discountedPrice?: number,
 *   image?: { url?: string, alt?: string }
 * }}} props - The product object to render
 * @returns {JSX.Element|null}
 *
 * @example
 * const product = {
 *   id: 1,
 *   title: "Pink Unicorn T-Shirt",
 *   price: 299,
 *   discountedPrice: 199,
 *   image: { url: "/images/unicorn.jpg", alt: "Unicorn T-shirt" }
 * };
 * return <Product product={product} />
 */

const Product = ({ product }) => {
	const { addToCart } = useCart();

	if (!product || !product.id) {
		return null;
	}
	const imageUrl = product.image?.url || 'https://via.placeholder.com/300';
	const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

	return (
		<div className="bg-sky-300 border border-sky-500 p-4 rounded-lg shadow-lg w-full min-h-[280px]">
			<div className="bg-white p-4 rounded-lg shadow-md text-black">
				<h2 className="text-lg font-semibold text-center">{product.title}</h2>

				<Link to={`/product/${product.id}`} className="flex justify-center">
					<img
						src={imageUrl}
						alt={product.image?.alt || 'Product image'}
						className="w-52 h-52 object-cover rounded cursor-pointer"
					/>
				</Link>

				{/* Price/discount */}
				<div className="text-center mt-2 flex flex-col items-center">
					{hasDiscount ? (
						<>
							<span className="text-gray-500 line-through text-lg">{product.price} kr</span>
							<span className="text-red-600 font-extrabold text-2xl">{product.discountedPrice} kr</span>
						</>
					) : (
						<>
							<span className="font-bold text-lg">{product.price} kr</span>
							<span className="invisible text-2xl">Placeholder</span>
						</>
					)}
				</div>

				{/* Buttons */}
				<div className="flex justify-between w-full mt-4 gap-x-2">
					<Link to={`/product/${product.id}`} className="flex-1 text-center">
						<button
							aria-label="View product"
							className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-800 w-full cursor-pointer"
						>
							View product
						</button>
					</Link>

					<button
						aria-label="Add to cart"
						onClick={() => addToCart(product)}
						className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-800 flex-1 cursor-pointer"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBar = ({ products }) => {
	const [query, setQuery] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const navigate = useNavigate();
	const searchRef = useRef(null);

	useEffect(() => {
		if (!Array.isArray(products)) {
			console.error('Feil: products er ikke en array!', products);
			return;
		}

		if (query.trim() === '') {
			setFilteredProducts([]);
			return;
		}

		const results = products.filter((product) =>
			product?.title?.toLowerCase().includes(query.toLowerCase()),
		);

		setFilteredProducts(results);
	}, [query, products]);

	const performSearch = () => {
		if (filteredProducts.length > 0) {
			navigate(`/product/${filteredProducts[0].id}`);
			setQuery('');
			setFilteredProducts([]);
		} else {
			console.warn('No products found matching your search:', query);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			performSearch();
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setQuery('');
				setFilteredProducts([]);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="flex justify-center items-start mt-10 relative" ref={searchRef}>
			<div className="relative w-4/5 lg:w-1/2 flex">
				{/* Search input */}
				<input
					id="searchInput"
					type="text"
					placeholder="Search for products..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					className="w-full p-3 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
				/>

				{/* Search button */}
				<button
					id="searchButton"
					title="Search"
					aria-label="Search"
					onClick={performSearch}
					className="bg-sky-600 text-white px-4 py-3 rounded-r-md hover:bg-sky-900"
				>
					<SearchIcon className="w-8 h-8 font-bold" />
				</button>

				{/* List with results */}
				{filteredProducts.length > 0 && (
					<ul className="absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded-md w-full shadow-lg z-50 text-black">
						{filteredProducts.map((product) => (
							<li key={product.id} className="hover:bg-sky-300 cursor-pointer">
								<Link
									to={`/product/${product.id}`}
									onClick={() => setQuery('')}
									className="block w-full p-2"
								>
									{product.title}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SearchBar;

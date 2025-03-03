// filepath: /src/components/searchbar/Searchbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = ({ products }) => {
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Array.isArray(products)) {
            console.error("Feil: products er ikke en array!", products);
            return;
        }

        if (query.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const results = products.filter((product) =>
            product?.title?.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredProducts(results);
    }, [query, products]);

    const performSearch = () => {
        if (filteredProducts.length > 0) {
            navigate(`/product/${filteredProducts[0].id}`);
            setQuery("");
        } else {
            console.warn("No products found matching your search:", query);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    };

    return (
        <div className="flex justify-center items-start mt-10"> 
            <div className="relative w-1/2 flex">  
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
                />

                {/* Search button */}
                <button
                    onClick={performSearch}
                    className="bg-sky-600 text-white px-4 py-3 rounded-r-md hover:bg-sky-900"
                >
                    <SearchIcon className="w-8 h-8 font-bold" />
                </button>

                {/* List with results */}
                {filteredProducts.length > 0 && (
                    <ul className="absolute left-0 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-lg z-50 text-black">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="hover:bg-sky-300 cursor-pointer">
                                <Link 
                                    to={`/product/${product.id}`} 
                                    onClick={() => setQuery("")}
                                    className="block w-full p-2">
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
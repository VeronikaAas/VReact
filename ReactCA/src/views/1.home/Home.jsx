import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../components/cart/Cartcontext";
import Product from "../../components/product/FetchProduct";
import SearchBar from "../../components/searchbar/Searchbar";

const Home = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://v2.api.noroff.dev/online-shop");
                const result = await response.json();

                const validProducts = Array.isArray(result.data) ? result.data : [];
                setProducts(validProducts);
            } catch (error) {
                console.error("An error occurred while fetching products:", error);
            }
        };
        fetchData();
    }, []);

    if (products.length === 0) {
        return <div className="text-black">Loading products...</div>;
    }

    return (
        <div className="p-6 text-black min-h-screen flex flex-col">
            <Helmet>
                <title>Shop</title>
            </Helmet>
            <SearchBar products={products} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 flex-grow">
                {products.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default Home;
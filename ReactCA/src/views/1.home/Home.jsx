import { useState, useEffect } from "react";
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

                // 🚀 Sjekker at result.data er en array før vi bruker den
                const validProducts = Array.isArray(result.data) ? result.data : [];
                setProducts(validProducts);
            } catch (error) {
                console.error("Feil ved henting av produkter:", error);
            }
        };
        fetchData();
    }, []);

    if (products.length === 0) {
        return <div className="text-black">Loading products...</div>;
    }

    return (
        <div className="p-6 text-black min-h-screen flex flex-col">
            {/* ✅ SearchBar skal ikke påvirke grid */}
            <SearchBar products={products} />

            {/* ✅ Grid-oppsett for produkter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 flex-grow">
                {products.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default Home;
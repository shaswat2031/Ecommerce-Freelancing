import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Info, ArrowRight, Filter, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import SaffronImage from '../assets/Saffron.png';
import HingImage from '../assets/Hing.png';

const Shop = () => {
    const { addToCart } = useCart();
    const { searchProducts } = useProducts();
    const { toggleWishlist, user } = useAuth();
    const { formatPrice } = useCurrency();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // URL Params
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    // Filter State
    const [filters, setFilters] = useState({
        keyword: queryParams.get('keyword') || '',
        category: queryParams.get('category') || '',
        minPrice: queryParams.get('minPrice') || '',
        maxPrice: queryParams.get('maxPrice') || '',
        sort: queryParams.get('sort') || ''
    });

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            setLoading(true);
            const params = {};
            if (filters.keyword) params.keyword = filters.keyword;
            if (filters.category) params.category = filters.category;
            if (filters.minPrice) params.minPrice = filters.minPrice;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;
            if (filters.sort) params.sort = filters.sort;

            const data = await searchProducts(params);
            setProducts(data);
            setLoading(false);
        };

        fetchFilteredProducts();
    }, [filters, searchProducts]);

    // Update filters when URL changes (e.g. from Navbar search)
    useEffect(() => {
        const currentParams = new URLSearchParams(location.search);
        setFilters(prev => ({
            ...prev,
            keyword: currentParams.get('keyword') || '',
            category: currentParams.get('category') || '',
            minPrice: currentParams.get('minPrice') || '',
            maxPrice: currentParams.get('maxPrice') || '',
            sort: currentParams.get('sort') || ''
        }));
    }, [location.search]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        updateUrl(newFilters);
    };

    const updateUrl = (newFilters) => {
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        navigate({ search: params.toString() });
    };

    const clearFilters = () => {
        const emptyFilters = { keyword: '', category: '', minPrice: '', maxPrice: '', sort: '' };
        setFilters(emptyFilters);
        updateUrl(emptyFilters);
    };

    return (
        <div className="w-full pt-20 bg-background min-h-screen">
            {/* Header */}
            {/* Flagship Products Showcase */}
            <div className="w-full">
                {/* Saffron Section */}
                <section className="relative py-20 px-4 bg-primary text-surface overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/5 transform skew-x-12 translate-x-1/4"></div>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="w-full md:w-1/2 space-y-6">
                            <span className="inline-block py-1 px-3 border border-accent rounded-full text-accent text-xs font-bold uppercase tracking-widest">
                                🌿 Flagship Product
                            </span>
                            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Kashmiri Saffron <span className="text-2xl text-accent font-normal block mt-2 font-body italic">(Kesar)</span>
                            </h2>
                            <h3 className="text-xl md:text-2xl text-white/90 font-light font-heading">
                                The World’s Most Precious Spice — Verified for Purity
                            </h3>
                            <p className="text-white/80 leading-relaxed font-light text-lg">
                                Hand-harvested from the high-altitude valleys of Kashmir, Siraba Organic Kashmiri Saffron represents the gold standard of saffron worldwide. Known for its deep crimson stigmas, rich aroma, and extraordinary potency, it is prized by gourmet chefs, wellness brands, and premium households across the globe.
                            </p>
                            <p className="text-white/80 leading-relaxed font-light text-sm italic border-l-2 border-accent pl-4">
                                Our saffron is carefully selected, graded, and processed under strict quality controls to preserve its natural strength, color, and therapeutic value.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                                <div>
                                    <h4 className="text-accent font-bold uppercase tracking-wider text-xs mb-3">Key Characteristics</h4>
                                    <ul className="space-y-2 text-sm text-white/70 font-light">
                                        <li className="flex items-start gap-2">• Deep red, hand-picked stigmas</li>
                                        <li className="flex items-start gap-2">• Naturally high levels of crocin, safranal & picrocrocin</li>
                                        <li className="flex items-start gap-2">• Globally accredited laboratory tested for purity</li>
                                        <li className="flex items-start gap-2">• No artificial coloring, no fillers, no additives</li>
                                        <li className="flex items-start gap-2">• Certified organic and export compliant</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-accent font-bold uppercase tracking-wider text-xs mb-3">Used globally for</h4>
                                    <ul className="space-y-2 text-sm text-white/70 font-light">
                                        <li className="flex items-start gap-2">• Gourmet and fine-dining cuisine</li>
                                        <li className="flex items-start gap-2">• Herbal and nutraceutical formulations</li>
                                        <li className="flex items-start gap-2">• Wellness, beauty, and skincare products</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, category: 'Saffron' }));
                                        // Scroll to product grid
                                        window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' });
                                    }}
                                    className="bg-accent text-primary px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-lg"
                                >
                                    Explore Kashmiri Saffron
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative group">
                            {/* Saffron Image */}
                            <div className="aspect-[3/4] w-full max-w-md relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl mx-auto">
                                <div className="absolute inset-0 bg-accent/20 animate-pulse-slow"></div>
                                <img
                                    src={SaffronImage}
                                    alt="Kashmiri Saffron"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <span className="absolute -bottom-10 -right-4 font-heading text-8xl text-white/10 font-bold z-10 select-none pointer-events-none">KESAR</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hing Section */}
                <section className="relative py-20 px-4 bg-background text-primary overflow-hidden border-b border-secondary/10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center relative z-10">
                        <div className="w-full md:w-1/2 space-y-6">
                            <span className="inline-block py-1 px-3 border border-primary/20 rounded-full text-primary/70 text-xs font-bold uppercase tracking-widest">
                                🌿 Flagship Product
                            </span>
                            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Premium Asafoetida <span className="text-2xl text-text-secondary font-normal block mt-2 font-body italic">(Hing)</span>
                            </h2>
                            <h3 className="text-xl md:text-2xl text-text-secondary font-light font-heading">
                                India’s Finest Export-Grade Hing — Trusted Worldwide
                            </h3>
                            <p className="text-text-secondary leading-relaxed font-light text-lg">
                                India is the undisputed global center for high-quality compounded and processed asafoetida — and Siraba Organic delivers the finest expression of it.
                            </p>
                            <p className="text-text-secondary leading-relaxed font-light text-sm italic border-l-2 border-primary pl-4">
                                Our Premium Hing is formulated using food-grade organic standards, ensuring purity, safety, and consistency for both household and professional use. Known for its powerful aroma, digestive benefits, and distinctive flavor, Siraba Hing is trusted by kitchens and food processors worldwide.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                                <div>
                                    <h4 className="text-primary font-bold uppercase tracking-wider text-xs mb-3">Key Characteristics</h4>
                                    <ul className="space-y-2 text-sm text-text-secondary font-light">
                                        <li className="flex items-start gap-2">• Food-grade compounded asafoetida</li>
                                        <li className="flex items-start gap-2">• Free from harmful fillers and adulterants</li>
                                        <li className="flex items-start gap-2">• Certified organic and export compliant</li>
                                        <li className="flex items-start gap-2">• Ideal for culinary, wellness, and traditional medicinal use</li>
                                        <li className="flex items-start gap-2">• Batch-tested and quality controlled</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-primary font-bold uppercase tracking-wider text-xs mb-3">Trusted by</h4>
                                    <ul className="space-y-2 text-sm text-text-secondary font-light">
                                        <li className="flex items-start gap-2">• Home chefs & Gourmet kitchens</li>
                                        <li className="flex items-start gap-2">• Global food brands</li>
                                        <li className="flex items-start gap-2">• Ayurvedic and wellness industries</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, category: 'Hing' }));
                                        window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' });
                                    }}
                                    className="bg-primary text-surface px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors duration-300 shadow-lg"
                                >
                                    Explore Premium Hing
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative group">
                            {/* Hing Image */}
                            <div className="aspect-[3/4] w-full max-w-md relative rounded-2xl border border-primary/10 overflow-hidden shadow-2xl mx-auto">
                                <div className="absolute inset-0 bg-primary/5 animate-pulse-slow"></div>
                                <img
                                    src={HingImage}
                                    alt="Premium Asafoetida"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <span className="absolute -bottom-10 -left-4 font-heading text-8xl text-primary/10 font-bold z-10 select-none pointer-events-none">HING</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden px-4 py-4 flex justify-between items-center border-b border-secondary/10">
                <span className="text-primary font-bold">{products.length} Products</span>
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-primary border border-primary/20 px-3 py-2 rounded-sm text-sm uppercase tracking-wider">
                    <Filter size={16} /> Filters
                </button>
            </div>

            <div id="product-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar / Filters */}
                    <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'} space-y-8`}>
                        <div className="flex justify-between items-center md:hidden mb-4">
                            <h2 className="font-heading text-xl font-bold">Filters</h2>
                            <button onClick={() => setShowFilters(false)}><X size={24} /></button>
                        </div>

                        {/* Search */}
                        <div>
                            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-primary mb-3">Search</h3>
                            <input
                                type="text"
                                name="keyword"
                                value={filters.keyword}
                                onChange={handleFilterChange}
                                placeholder="Search products..."
                                className="w-full bg-surface border border-secondary/20 p-2 text-sm rounded-sm focus:outline-none focus:border-primary"
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-primary mb-3">Category</h3>
                            <div className="space-y-2">
                                {['Spices', 'Dry Fruits', 'Honey', 'Oils'].map(cat => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat}
                                            checked={filters.category === cat}
                                            onChange={handleFilterChange}
                                            className="accent-primary"
                                        />
                                        <span className="text-text-secondary group-hover:text-primary transition-colors text-sm">{cat}</span>
                                    </label>
                                ))}
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        value=""
                                        checked={filters.category === ''}
                                        onChange={handleFilterChange}
                                        className="accent-primary"
                                    />
                                    <span className="text-text-secondary group-hover:text-primary transition-colors text-sm">All Categories</span>
                                </label>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-primary mb-3">Price Range</h3>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    className="w-full bg-surface border border-secondary/20 p-2 text-sm rounded-sm focus:outline-none focus:border-primary"
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    className="w-full bg-surface border border-secondary/20 p-2 text-sm rounded-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-primary mb-3">Sort By</h3>
                            <select
                                name="sort"
                                value={filters.sort}
                                onChange={handleFilterChange}
                                className="w-full bg-surface border border-secondary/20 p-2 text-sm rounded-sm focus:outline-none focus:border-primary"
                            >
                                <option value="">Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>

                        <button onClick={clearFilters} className="text-xs text-text-secondary underline hover:text-red-500">
                            Clear All Filters
                        </button>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <div key={n} className="bg-surface rounded-sm h-96 animate-pulse"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div key={product._id || product.id} className="group bg-surface rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-secondary/10 flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative aspect-square overflow-hidden bg-background p-8 flex items-center justify-center">
                                            <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                                                {product.tag}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleWishlist(product._id || product.id);
                                                }}
                                                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <Heart
                                                    size={16}
                                                    className={user?.wishlist?.some(item => (typeof item === 'object' ? item._id : item) === (product._id || product.id)) ? "fill-current" : ""}
                                                />
                                            </button>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            {/* Quick Action Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <Link to={`/product/${product.slug}`} className="block w-full text-center bg-white/90 backdrop-blur text-primary py-3 uppercase tracking-wider text-xs font-bold hover:bg-primary hover:text-white transition-colors shadow-lg">
                                                    Quick View
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex text-accent text-sm">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-accent" : "text-gray-300"} />
                                                    ))}
                                                    <span className="ml-2 text-text-secondary text-xs">({product.reviews})</span>
                                                </div>
                                                <span className="text-secondary text-xs uppercase tracking-wider font-medium">In Stock</span>
                                            </div>

                                            <Link to={`/product/${product.slug}`}>
                                                <h2 className="font-heading text-2xl text-primary font-bold mb-3 group-hover:text-accent transition-colors">
                                                    {product.name}
                                                </h2>
                                            </Link>
                                            <p className="text-text-secondary text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-secondary/10 mt-auto">
                                                <span className="text-xl font-bold text-primary">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="bg-primary text-surface px-6 py-3 text-xs font-medium uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2 rounded-sm group-btn">
                                                    Add <ShoppingBag size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-primary mb-4">No Products Found</h3>
                                <p className="text-text-secondary mb-8">Try adjusting your search or filters.</p>
                                <button onClick={clearFilters} className="bg-primary text-white px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors">
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <section className="bg-surface border-t border-secondary/10 py-16 mt-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <Info size={24} />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-primary">Lab Tested</h3>
                        <p className="text-text-secondary text-sm font-light">Every batch tested by Eurofins Germany</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <ShoppingBag size={24} />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-primary">Secure Checkout</h3>
                        <p className="text-text-secondary text-sm font-light">256-bit SSL encrypted payments</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <ArrowRight size={24} />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-primary">Fast Delivery</h3>
                        <p className="text-text-secondary text-sm font-light">Express shipping worldwide</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shop;

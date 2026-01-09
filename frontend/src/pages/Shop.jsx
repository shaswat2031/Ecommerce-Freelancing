import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Info, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Shop = () => {
    const { addToCart } = useCart();
    const { products } = useProducts();

    return (
        <div className="w-full pt-20 bg-background min-h-screen">
            {/* Header */}
            <div className="bg-primary pt-16 pb-12 px-4 text-center text-surface">
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-wide mb-4">Shop Premium Organics</h1>
                <p className="text-white/80 font-light max-w-2xl mx-auto text-lg">
                    Discover our exclusive collection of certified organic treasures. Directly from farm to your home.
                </p>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <div key={product._id || product.id} className="group bg-surface rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-secondary/10 flex flex-col">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-background p-8 flex items-center justify-center">
                                <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                                    {product.tag}
                                </span>
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
                                <p className="text-text-secondary text-sm font-light leading-relaxed mb-6 flex-grow">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-secondary/10 mt-auto">
                                    <span className="text-xl font-bold text-primary">
                                        {product.currency}{product.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-primary text-surface px-6 py-3 text-xs font-medium uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2 rounded-sm group-btn">
                                        Add to Cart <ShoppingBag size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Section */}
            <section className="bg-surface border-t border-secondary/10 py-16">
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

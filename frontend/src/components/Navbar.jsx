import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import SaffronImg from '../assets/Saffron.png';
import HingImg from '../assets/Hing.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchInputRef = useRef(null);

    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    // Mock Product Data for Search
    const allProducts = [
        { id: 1, name: "Kashmiri Mongra Saffron", category: "Spices", price: "₹850", image: SaffronImg, link: "/shop" },
        { id: 2, name: "Premium Asafoetida (Hing)", category: "Spices", price: "₹450", image: HingImg, link: "/shop" },
        { id: 3, name: "Organic Walnuts", category: "Dry Fruits", price: "₹600", image: null, link: "/shop" },
        { id: 4, name: "Turmeric Powder", category: "Spices", price: "₹180", image: null, link: "/shop" },
    ];

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([]);
        } else {
            const results = allProducts.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [searchQuery]);

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-secondary/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-20">

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-primary hover:text-accent transition-colors"
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Logo (Hidden on mobile if search is open? No, keep it) */}
                    <div className={`flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
                        <Link to="/" className="flex flex-col items-center md:items-start group">
                            <span className="font-heading text-2xl md:text-3xl font-bold text-primary tracking-wide group-hover:text-accent transition-colors duration-300">
                                SIRABA
                            </span>
                            <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-secondary font-medium group-hover:text-primary transition-colors duration-300">
                                Organic
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation / Search Bar Transition */}
                    <div className="flex-1 flex items-center justify-end md:justify-center px-4 md:px-8">
                        {!isSearchOpen ? (
                            /* Standard Nav Links */
                            <div className="hidden md:flex items-center space-x-8 lg:space-x-12 animate-fade-in">
                                {['Shop', 'About Us', 'Certification', 'B2B', 'Contact Us'].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/${item.toLowerCase().replace(/ & /g, '-').replace(' ', '-')}`}
                                        className="text-text-primary hover:text-accent font-body text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            /* Apple-style Inline Search Bar */
                            <div className="flex flex-1 max-w-2xl relative animate-fade-in w-full">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/50" size={20} strokeWidth={1.5} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search details..."
                                    className="w-full bg-transparent border-none text-primary placeholder-primary/40 text-lg pl-10 pr-12 py-2 focus:ring-0 font-light outline-none"
                                />
                                <button onClick={handleCloseSearch} className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/50 text-xs uppercase tracking-wider font-bold hover:text-primary transition-colors">
                                    Close
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* Toggle Search visibility if closed */}
                        {!isSearchOpen && (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-all duration-300"
                                aria-label="Search"
                            >
                                <Search size={22} strokeWidth={1.5} className="text-primary group-hover:text-accent transition-colors" />
                            </button>
                        )}

                        <Link to="/account" className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-all duration-300 ${isSearchOpen ? 'hidden lg:flex' : ''}`}>
                            <User size={22} strokeWidth={1.5} className="text-primary hover:text-accent transition-colors" />
                        </Link>
                        <Link to="/cart" className={`relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-all duration-300 group ${isSearchOpen ? 'hidden lg:flex' : ''}`}>
                            <ShoppingBag size={22} strokeWidth={1.5} className="text-primary group-hover:text-accent transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-primary text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Search Results Dropdown (Amazon/Apple Style Dropdown) */}
                {isSearchOpen && searchQuery && (
                    <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white shadow-xl rounded-b-md border border-secondary/10 overflow-hidden animate-slide-up origin-top z-50">
                        <div className="max-h-[60vh] overflow-y-auto">
                            {filteredProducts.length > 0 ? (
                                <div>
                                    <div className="bg-gray-50 px-4 py-2 text-xs uppercase tracking-widest text-text-secondary font-semibold border-b border-gray-100">
                                        Products
                                    </div>
                                    {filteredProducts.map(product => (
                                        <Link
                                            key={product.id}
                                            to={product.link}
                                            onClick={handleCloseSearch}
                                            className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none group"
                                        >
                                            <div className="w-10 h-10 bg-white border border-gray-100 rounded-sm flex-shrink-0 flex items-center justify-center p-1 mr-4">
                                                <img src={product.image || SaffronImg} alt={product.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors">{product.name}</p>
                                                <p className="text-xs text-text-secondary">{product.category}</p>
                                            </div>
                                            <span className="text-sm font-bold text-primary">{product.price}</span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-text-secondary">
                                    No results found.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop for Desktop Focus */}
            {isSearchOpen && (
                <div className="hidden md:block fixed inset-0 top-20 bg-black/20 backdrop-blur-[2px] -z-10 animate-fade-in" onClick={handleCloseSearch}></div>
            )}

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-secondary/20 transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                {/* Mobile Search Input */}
                <div className="p-4 border-b border-secondary/10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-secondary/5 border border-secondary/20 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                    </div>
                </div>
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {['Shop', 'About Us', 'Certification', 'B2B', 'Contact Us'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase().replace(/ & /g, '-').replace(' ', '-')}`}
                            className="block px-3 py-3 text-base font-medium text-primary hover:bg-secondary/10 hover:text-accent rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to="/account"
                        className="block px-3 py-3 text-base font-medium text-primary hover:bg-secondary/10 hover:text-accent rounded-md transition-colors border-t border-secondary/10 mt-2"
                        onClick={() => setIsOpen(false)}
                    >
                        My Account
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

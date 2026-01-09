import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-surface pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex flex-col">
                            <span className="font-heading text-3xl font-bold tracking-wide text-surface">SIRABA</span>
                            <span className="text-xs uppercase tracking-[0.3em] text-secondary">Organic</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed font-light">
                            Bringing the world's finest certified organic saffron and superfoods directly from the pristine farms of India to your home.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-heading font-bold text-lg text-primary">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
                            <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
                            <li><Link to="/b2b" className="hover:text-accent transition-colors">B2B & Exports</Link></li>
                            <li><Link to="/certifications" className="hover:text-accent transition-colors">Certifications</Link></li>
                            <li><Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-lg mb-6 text-accent">Company</h4>
                        <ul className="space-y-4 text-sm font-light text-white/80">
                            <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Certifications</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-lg mb-6 text-accent">Newsletter</h4>
                        <p className="text-sm font-light text-white/60 mb-4">
                            Subscribe for exclusive offers and wellness tips.
                        </p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-surface placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-sm"
                            />
                            <button className="bg-accent text-primary px-4 py-3 text-sm font-medium uppercase tracking-wider hover:bg-white transition-colors duration-300 rounded-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-xs text-white/40 font-light">
                        © 2026 Siraba Organic. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-white/40 font-light">
                        <a href="#" className="hover:text-surface transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-surface transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-surface transition-colors">Shipping & Returns</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

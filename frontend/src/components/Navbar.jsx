import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            gsap.to('.mobile-menu', { x: '0%', duration: 0.7, ease: 'power4.out' });
            gsap.fromTo(
                '.mobile-link',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, delay: 0.2 }
            );
        } else {
            gsap.to('.mobile-menu', { x: '100%', duration: 0.6, ease: 'power4.in' });
        }
    };

    return (
        <>
            {/* NAVBAR */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0F3D2E] py-4 shadow-xl'
                    : 'bg-transparent py-6 md:py-8'
                    }`}
            >
                <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="font-heading text-3xl md:text-4xl tracking-[0.35em] text-white"
                    >
                        SIRABA
                        <span className="text-accent">.</span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden md:flex items-center gap-16 lg:gap-24">
                        {[
                            { name: 'Shop', path: '/' },
                            { name: 'Our Story', path: '/about' },
                            { name: 'Traceability', path: '#' }
                        ].map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative font-body text-xs tracking-[0.3em] uppercase text-white/80 hover:text-white transition-colors"
                            >
                                {link.name}
                                <span
                                    className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-8 text-white">
                        <button className="hidden md:block hover:text-accent transition">
                            <Search size={22} strokeWidth={1.5} />
                        </button>

                        <button className="relative hover:text-accent transition">
                            <ShoppingBag size={22} strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent" />
                        </button>

                        <button
                            className="md:hidden hover:text-accent transition"
                            onClick={toggleMenu}
                        >
                            <Menu size={26} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div className="mobile-menu fixed inset-0 z-[60] bg-primary translate-x-full flex flex-col items-center justify-center text-white">
                <button
                    onClick={toggleMenu}
                    className="absolute top-8 right-8 text-white/60 hover:text-white"
                >
                    <X size={32} strokeWidth={1} />
                </button>

                <div className="absolute top-8 left-8 font-heading tracking-[0.4em] text-white/20">
                    SIRABA
                </div>

                <Link to="/" onClick={toggleMenu} className="mobile-link font-heading text-5xl hover:text-accent transition hover:italic">
                    Shop
                </Link>
                <Link to="/about" onClick={toggleMenu} className="mobile-link font-heading text-5xl hover:text-accent transition hover:italic">
                    Our Story
                </Link>
                <a href="#" onClick={toggleMenu} className="mobile-link font-heading text-5xl hover:text-accent transition hover:italic">
                    Traceability
                </a>

                <div className="mobile-link mt-14 flex gap-10 text-xs tracking-[0.3em] text-white/50">
                    <span>INSTAGRAM</span>
                    <span>SUPPORT</span>
                </div>
            </div>
        </>
    );
};

export default Navbar;

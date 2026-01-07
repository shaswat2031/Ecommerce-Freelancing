import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Award, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';
import heroBg from '../assets/bgimage2.png';
import saffronImg from '../assets/Saffron.png';
import hingImg from '../assets/Hing.png';

gsap.registerPlugin(ScrollTrigger);

function Homepage() {
    const mainRef = useRef(null);

    // Load animations
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Loader Animation (Simulated)
            const tl = gsap.timeline();

            tl.from('.loader-text span', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
            })
                .to('.loader', {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    delay: 0.5,
                })
                .from('.hero-title-char', {
                    y: 100,
                    opacity: 0,
                    rotateX: -45,
                    stagger: 0.05,
                    duration: 1,
                    ease: 'back.out(1.7)',
                }, '-=0.5')
                .from('.hero-subtitle', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.6')
                .from('.hero-cta', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.6')
                .from('.nav-link', {
                    y: -20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                }, '-=1');

            // Scroll Animations for Sections
            gsap.utils.toArray('.reveal-section').forEach((section) => {
                gsap.fromTo(section,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });

            // Parallax for images
            gsap.utils.toArray('.parallax-img').forEach((img) => {
                gsap.to(img, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });

            // Product Cards Hover Effect (using GSAP for smoother interaction)
            const products = gsap.utils.toArray('.product-card');
            products.forEach((product) => {
                const img = product.querySelector('.product-img-inner');
                product.addEventListener('mouseenter', () => {
                    gsap.to(img, { scale: 1.1, duration: 0.5 });
                });
                product.addEventListener('mouseleave', () => {
                    gsap.to(img, { scale: 1, duration: 0.5 });
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="app-container">

            {/* Loader */}
            <div className="loader">
                <h1 className="loader-text">
                    {'SIRABA'.split('').map((char, i) => <span key={i}>{char}</span>)}
                </h1>
            </div>

            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-wrapper">
                    <div className="hero-overlay"></div>
                    {/* Placeholder for Saffron Field Video/Image */}
                    <div className="parallax-img hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
                </div>

                <div className="hero-content">
                    <p className="hero-subtitle">The Purest Essence of Kashmir</p>
                    <h1 className="hero-title">
                        {'GOLDEN'.split('').map((char, i) => <span key={i} className="hero-title-char">{char}</span>)}
                        <br />
                        {'HERITAGE'.split('').map((char, i) => <span key={i} className="hero-title-char">{char}</span>)}
                    </h1>
                    <button className="hero-cta">
                        <span>Discover Collection</span>
                    </button>
                </div>

                <div className="hero-footer">
                    <p>EST. 2024</p>
                    <p>INDIA → GLOBAL</p>
                </div>
            </section>

            {/* Introduction */}
            <section className="intro-section reveal-section">
                <div className="container intro-grid">
                    <div className="intro-heading">
                        <h2>
                            Nature's most precious <span>gifts</span>, curated for the modern connoisseur.
                        </h2>
                    </div>
                    <div className="intro-text-wrapper">
                        <p className="intro-text">
                            Siraba Organic bridges the gap between ancient agricultural wisdom and world-class quality standards. We bring you the finest Kesar (Saffron) and Hing (Asafoetida), direct from the valleys of India to your table.
                        </p>
                        <div className="intro-stats">
                            <div className="stat-item">
                                <h4>100%</h4>
                                <p>Certified Organic</p>
                            </div>
                            <div className="stat-item">
                                <h4>A++</h4>
                                <p>Grade Quality</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="products-section">
                <div className="container products-header">
                    <h3 className="section-title">Curated Harvest</h3>
                    <a href="#" className="view-all-link">View All <ArrowRight size={16} /></a>
                </div>

                <div className="products-grid reveal-section">
                    {/* Card 1: Saffron */}
                    <div className="product-card">
                        <div className="product-img-wrapper">
                            <div className="product-img-inner" style={{ backgroundImage: `url(${saffronImg})` }}></div>
                            <div className="product-overlay"></div>
                        </div>
                        <div className="product-info">
                            <span className="product-badge">Limited Batch</span>
                            <h3>Kashmiri Mongra Saffron</h3>
                            <p>The world's rarest spice, hand-harvested from the fields of Pampore.</p>
                            <button className="shop-btn">
                                Shop Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Hing */}
                    <div className="product-card card-offset">
                        <div className="product-img-wrapper">
                            <div className="product-img-inner" style={{ backgroundImage: `url(${hingImg})` }}></div>
                            <div className="product-overlay"></div>
                        </div>
                        <div className="product-info">
                            <span className="product-badge">Ayurvedic Basic</span>
                            <h3>Premium Hing (Asafoetida)</h3>
                            <p>Intense aroma and powerful digestive benefits, sourced from the wild.</p>
                            <button className="shop-btn">
                                Shop Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee / Trust Strip */}
            <div className="marquee-section reveal-section">
                <div className="marquee-content animate-scroll">
                    {Array(10).fill('USDA ORGANIC • EUROFINS TESTED • 100% PURE •').map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </div>
            </div>

            {/* Philosophy / Values */}
            <section className="values-section reveal-section">
                <div className="container">
                    <div className="values-layout">
                        <div className="values-intro">
                            <h3>Why Siraba?</h3>
                            <p>
                                In a market flooded with adulteration, we stand as a beacon of purity. Every strand of saffron and every grain of hing is traced back to its origin.
                            </p>
                            <button className="read-more-btn">Read our Manifesto</button>
                        </div>

                        <div className="values-grid">
                            <div className="value-item">
                                <Leaf className="value-icon" size={40} />
                                <h4>Eco-Conscious</h4>
                                <p>Sustainable farming practices that enrich the soil rather than depleting it.</p>
                            </div>
                            <div className="value-item">
                                <Award className="value-icon" size={40} />
                                <h4>Certified Quality</h4>
                                <p>Rigorous testing by Eurofins and USDA certification to ensure zero pesticide residue.</p>
                            </div>
                            <div className="value-item">
                                <MapPin className="value-icon" size={40} />
                                <h4>Single Origin</h4>
                                <p>Sourced directly from verified farmers in Kashmir and Afghanistan.</p>
                            </div>
                            <div className="value-item">
                                <ShoppingBag className="value-icon" size={40} />
                                <h4>Timeless Packaging</h4>
                                <p>Glass and metal packaging designed to preserve freshness and reduce plastic waste.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Homepage;

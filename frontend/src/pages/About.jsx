import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Heart, ShieldCheck, Quote, Sprout, Globe, CheckCircle2, Leaf, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import organicVideo from '../assets/Siraba_s_Organic_Spices_Video_Ready.mp4';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Animations
            const tl = gsap.timeline();
            tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
                .from('.hero-title-char', {
                    y: 100,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: 'power4.out',
                }, '-=0.4')
                .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');

            // Scroll Reveals
            gsap.utils.toArray('.reveal-text').forEach((el) => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                );
            });

            // Image Scale Reveal
            gsap.utils.toArray('.reveal-image').forEach((wrapper) => {
                const img = wrapper.querySelector('img');
                gsap.fromTo(wrapper,
                    { clipPath: 'inset(10% 10% 10% 10%)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.5,
                        ease: 'power4.inOut',
                        scrollTrigger: { trigger: wrapper, start: 'top 80%' }
                    }
                );
                gsap.fromTo(img,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        duration: 1.5,
                        ease: 'power4.inOut',
                        scrollTrigger: { trigger: wrapper, start: 'top 80%' }
                    }
                );
            });


            // Premium Staggered Reveal
            gsap.set('.features-grid', { perspective: 1000 });
            gsap.from('.feature-card', {
                y: 60,
                opacity: 0,
                rotateX: -5,
                scale: 0.95,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                clearProps: 'all', // Ensure clean state after animation
                scrollTrigger: {
                    trigger: '.features-grid',
                    start: 'top 75%',
                }
            });

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="min-h-screen bg-[#FDFDFB] text-text-primary font-body overflow-x-hidden selection:bg-accent selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-6 bg-primary text-surface overflow-hidden">
                {/* Textured Background */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] pointer-events-none"></div>

                {/* Animated Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse duration-[10s]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto relative z-10 text-center max-w-5xl flex flex-col items-center justify-center">
                    <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 border border-accent/30 rounded-full bg-surface/5 backdrop-blur-sm mb-8 text-accent uppercase tracking-widest text-xs font-semibold">
                        <Leaf size={14} /> <span>Heritage & Purity</span>
                    </div>

                    <h1 className="text-8xl md:text-[10rem] font-heading font-normal leading-none mb-4 tracking-tight">
                        {'About Siraba'.split('').map((char, i) => (
                            <span key={i} className="hero-title-char inline-block whitespace-pre">{char}</span>
                        ))}
                    </h1>

                    <p className="hero-desc w-full max-w-3xl text-2xl md:text-3xl font-light opacity-80 leading-relaxed text-center px-4">
                        Cultivating a legacy of standard, ethical farming directly from the ancient soils to your modern table.
                    </p>

                    <div className="hero-desc mt-12 flex justify-center">
                        <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Main Content - Narrative */}
            <section className="py-32 px-6 md:px-12 bg-[#FDFDFB] relative flex items-center justify-center min-h-screen">
                <div className="container mx-auto grid lg:grid-cols-12 gap-16 items-center max-w-7xl">

                    {/* Video Column */}
                    <div className="lg:col-span-5 relative reveal-image overflow-hidden rounded-lg shadow-2xl">
                        <div className="aspect-[4/5] relative z-10 bg-black">
                            <video
                                src={organicVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover w-full h-full"
                                aria-label="Organic Spices and Saffron - Siraba's Curated Selection"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-8 -left-8 w-full h-full border-2 border-accent/20 rounded-lg hidden lg:block"></div>
                        <div className="absolute -z-10 bottom-8 -right-8 w-full h-full border border-secondary/20 rounded-lg hidden lg:block"></div>
                    </div>

                    {/* Text Column */}
                    <div className="lg:col-span-7 lg:pl-16 space-y-10">
                        <div className="reveal-text">
                            <h2 className="text-5xl md:text-7xl font-heading text-primary mb-6" style={{ lineHeight: '1.4' }}>
                                Nature's wisdom,<br />
                                <span className="text-secondary italic">bottled for you.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-[#4A4A4A] text-lg md:text-xl font-light reveal-text">
                            <p className="text-justify" style={{ lineHeight: '2' }}>
                                The world of <strong className="text-primary font-medium">organic</strong> is expanding rapidly, yet the core question remains: <span className="italic font-serif text-xl text-accent">Why?</span> It is a conscious choice to return to the roots, where produce is nurtured by the sun and soil alone, untouched by synthetic shortcuts.
                            </p>
                            <p className="text-justify" style={{ lineHeight: '2' }}>
                                At <strong className="text-primary font-semibold">Siraba</strong>, we don't just source; we <em className="text-secondary">curate</em>. From the saffron fields of Kashmir to the wild asafoetida of the mountains, our mission is to bridge the gap between farm and fork with transparency and trust.
                            </p>
                        </div>

                        <div className="reveal-text bg-gradient-to-br from-white to-[#FDFDFB] p-8 md:p-12 border-l-4 border-accent shadow-lg rounded-r-lg mt-16 relative overflow-hidden">
                            <p className="text-xl md:text-2xl font-heading text-primary italic relative z-10" style={{ lineHeight: '2' }}>
                                "Life never stops, but health is the pause we must take. Eating pure is not a luxury—it is a fundamental right for a wholesome tomorrow."
                            </p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Pillars Section - Premium Full Viewport */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-32 md:py-40 bg-[#FDFDFB] relative">
                {/* Subtle Background */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] pointer-events-none"></div>

                {/* Centered Heading */}
                <div className="container mx-auto relative z-10 max-w-7xl">
                    <div className="text-center mb-20 md:mb-32 reveal-text">
                        <span className="text-accent font-semibold tracking-[0.3em] text-xs md:text-sm uppercase block mb-6">Our Foundation</span>
                        <h3 className="text-5xl md:text-8xl font-heading text-primary mb-10">The Four Pillars</h3>
                        <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
                    </div>

                    {/* Four Pillars Grid - Clean & Symmetrical */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-16 features-grid px-4">
                        {/* Mission */}
                        <div className="feature-card group bg-white border border-gray-100 rounded-3xl p-10 md:p-14 hover:shadow-[0_20px_50px_-12px_rgba(15,61,46,0.1)] hover:border-accent/20 transition-all duration-500 overflow-hidden">
                            <div className="mb-8 inline-block p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500">
                                <Target strokeWidth={1.5} className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="text-3xl md:text-4xl font-heading text-primary mb-6 group-hover:text-accent transition-colors duration-500">Our Mission</h4>
                            <p className="text-text-secondary leading-loose font-light text-lg">
                                Sourcing 100% certified, authentic organic products to serve you for a healthier, more wholesome life.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="feature-card group bg-white border border-gray-100 rounded-3xl p-10 md:p-14 hover:shadow-[0_20px_50px_-12px_rgba(107,142,110,0.1)] hover:border-secondary/20 transition-all duration-500 overflow-hidden">
                            <div className="mb-8 inline-block p-4 rounded-2xl bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-500">
                                <Globe strokeWidth={1.5} className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="text-3xl md:text-4xl font-heading text-primary mb-6 group-hover:text-secondary transition-colors duration-500">Our Vision</h4>
                            <p className="text-text-secondary leading-loose font-light text-lg">
                                Passing on nature's gifts exactly as they were given. We strive to see the world completely embrace the Organic paradigm.
                            </p>
                        </div>

                        {/* Core Values */}
                        <div className="feature-card group bg-white border border-gray-100 rounded-3xl p-10 md:p-14 hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.1)] hover:border-accent/20 transition-all duration-500 overflow-hidden">
                            <div className="mb-8 inline-block p-4 rounded-2xl bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500">
                                <Heart strokeWidth={1.5} className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="text-3xl md:text-4xl font-heading text-primary mb-6 group-hover:text-accent transition-colors duration-500">Core Values</h4>
                            <p className="text-text-secondary leading-loose font-light text-lg">
                                Healthy Life, Healthy Society, and a Healthy World. This mantra drives every decision we make.
                            </p>
                        </div>

                        {/* Objectives */}
                        <div className="feature-card group bg-white border border-gray-100 rounded-3xl p-10 md:p-14 hover:shadow-[0_20px_50px_-12px_rgba(15,61,46,0.1)] hover:border-primary/20 transition-all duration-500 overflow-hidden">
                            <div className="mb-8 inline-block p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500">
                                <ShieldCheck strokeWidth={1.5} className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="text-3xl md:text-4xl font-heading text-primary mb-6 group-hover:text-primary/80 transition-colors duration-500">Objectives</h4>
                            <p className="text-text-secondary leading-loose font-light text-lg">
                                Plants are food and medicine. We have a duty not to poison them with pesticides or artificial treatments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Editorial - Marketer's Desk */}
            <section className="letter-section min-h-screen flex items-center justify-center py-24 md:py-40 my-32 md:my-48 relative overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.03]"></div>

                {/* Ambient glows - Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full"></div>

                <div className="w-full relative z-10 px-4 flex justify-center">
                    <div className="w-full max-w-3xl mx-auto letter-paper rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-2xl ring-1 ring-white/10 text-center">

                        {/* 1. Header Band */}
                        <div className="flex flex-col items-center mb-10 md:mb-14 space-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold">Marketing Insights</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-heading font-light leading-tight text-accent drop-shadow-lg">
                                From the <br className="md:hidden" /> <span className="italic font-normal">Marketer's Desk</span>
                            </h3>
                        </div>

                        {/* 2. Quote Band - Fixed Overlap */}
                        <div className="relative mb-10 md:mb-14 flex flex-col items-center gap-6">
                            {/* Icon as a block element, not absolute */}
                            <div className="bg-white/5 p-3 rounded-full border border-white/10 shadow-inner">
                                <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent/80" />
                            </div>

                            <blockquote className="letter-quote text-lg md:text-2xl text-center leading-relaxed text-white relative z-10 drop-shadow-md max-w-2xl mx-auto px-2">
                                "One of the most critical steps for a successful seller is using the right pricing strategies to increase your rankings, conversions, and revenue. Our Siraba marketing agency analyzes many variables when listing a new product, including extensive competitor analysis to find the best price for you."
                            </blockquote>
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-center mb-10 md:mb-14">
                            <div className="h-10 md:h-12 w-[1px] bg-gradient-to-b from-accent/80 to-transparent mb-4"></div>
                            <p className="font-heading text-lg md:text-xl text-white font-medium tracking-wide">Marketing Department</p>
                            <p className="text-accent text-[10px] tracking-[0.3em] uppercase mt-1.5 font-bold">Siraba Organic</p>
                        </div>

                        {/* Divider */}
                        <div className="letter-divider w-full max-w-[150px] md:max-w-[200px] mx-auto mb-10 opacity-30"></div>

                        {/* 3. Expertise Pillars Band - Tighter Centered Grid */}
                        <div className="grid md:grid-cols-2 gap-8 max-w-lg mx-auto">
                            {/* Service */}
                            <div className="flex flex-col items-center justify-center text-center group">
                                <div className="p-3 md:p-3.5 rounded-2xl bg-accent/10 border border-accent/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)] mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-accent uppercase tracking-[0.25em] mb-1.5 font-bold">Services</h4>
                                    <p className="text-sm text-white font-light leading-relaxed max-w-[160px] mx-auto opacity-90">B2B Solutions & Custom Budgeting</p>
                                </div>
                            </div>

                            {/* Trust */}
                            <div className="flex flex-col items-center justify-center text-center group">
                                <div className="p-3 md:p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(107,142,110,0.3)] mb-3">
                                    <Leaf className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-secondary uppercase tracking-[0.25em] mb-1.5 font-bold">Trust</h4>
                                    <p className="text-sm text-white font-light leading-relaxed max-w-[160px] mx-auto opacity-90">Certified Organic, Fine Trace Management</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;

import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Sprout, Quote } from 'lucide-react';
import BgImage1 from '../assets/bgimage1.png'; // Using as hero background
import BgImage2 from '../assets/bgimage2.png'; // Using as secondary background

const About = () => {
    return (
        <div className="w-full pt-20">
            {/* Header / Breadcrumb Section */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={BgImage1} alt="Saffron Fields" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                </div>
                <div className="relative z-10 text-center space-y-4 animate-fade-in-up">
                    <h1 className="font-heading text-4xl md:text-5xl text-surface font-bold tracking-wide">ABOUT US</h1>
                    <div className="flex items-center justify-center space-x-2 text-sm md:text-base text-surface/80 font-light">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-accent">About Us</span>
                    </div>
                </div>
            </div>

            {/* About Siraba Organic Content */}
            <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-accent text-sm tracking-[0.2em] uppercase font-bold">Who We Are</span>
                        <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">ABOUT SIRABA ORGANIC</h2>
                        <div className="space-y-4 text-text-secondary font-light leading-relaxed text-lg">
                            <p>
                                The organic space is growing at an exponential rate, but yet a lot of people still do not understand why they should eat organic, and how it’s different from the regular produce they consume. The term ‘organic’ refers to anything that is grown or made without the use of any chemicals or pesticides; that is, it’s grown completely naturally. Offering wide range of conventional, organic, exotic fresh Fruits & Vegetables through direct farm sourcing.
                            </p>
                            <p>
                                Life never stops for anything but life with multiple health issues are challenging for everyone. No matter what you have or what not. I am sure you guys have already gone through with Mission, Vision & Objectives of this Firm. With grace of God, we are working hard towards helping human beings with the hygiene and quality product. Eat pure and healthy is a part of our fundamental right and we must adopt this for our better tomorrow.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Placeholder for an image - using BgImage2 for now as a side image */}
                        <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                            <img src={BgImage2} alt="Organic Farming" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-surface p-6 shadow-lg hidden md:block border-l-4 border-accent max-w-xs">
                            <p className="font-heading text-xl text-primary italic">"Eat pure and healthy is a part of our fundamental right."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values, Objectives */}
            <section className="bg-primary py-20 px-4 text-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Mission */}
                        <div className="bg-white/5 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300 border border-white/10 group">
                            <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                <Target size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-4 text-accent">OUR MISSION</h3>
                            <p className="text-white/80 font-light text-sm leading-relaxed">
                                Sourcing the 100% certified, authentic organic and high-end quality products and serve it to you for your better healthier and wholesome life.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white/5 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300 border border-white/10 group">
                            <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                <Eye size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-4 text-accent">OUR VISION</h3>
                            <p className="text-white/80 font-light text-sm leading-relaxed">
                                Desperately, we want to pass on the product as mother nature has given us. We want to see the world in Organic paradigm.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="bg-white/5 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300 border border-white/10 group">
                            <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                <Heart size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-4 text-accent">VALUES</h3>
                            <p className="text-white/80 font-light text-sm leading-relaxed">
                                Healthy life, Healthy society and a Healthy world is our mantra and objective of our business.
                            </p>
                        </div>

                        {/* Objectives */}
                        <div className="bg-white/5 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300 border border-white/10 group">
                            <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                <Sprout size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-4 text-accent">OBJECTIVES</h3>
                            <p className="text-white/80 font-light text-sm leading-relaxed">
                                Various plants and trees are a source of food and medicine but as a human being we are not supposed to add poison in it as a pesticide or other artificial growth treatment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Head Marketer's Message */}
            <section className="py-20 md:py-28 px-4 max-w-5xl mx-auto text-center">
                <Quote size={48} className="text-accent/30 mx-auto mb-8 rotate-180" />
                <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-8">Head Marketer's Message</h2>
                <div className="space-y-6 text-text-secondary font-light leading-relaxed text-lg max-w-4xl mx-auto">
                    <p>
                        One of the most critical steps for a successful seller is using the right pricing strategies to increase your rankings, conversions, and revenue. Our Siraba marketing agency analyzes many variables when listing a new product. Our Siraba include extensive competitor analysis to find the best price for your product.
                    </p>
                    <p>
                        We are having B2B business scenario and accordingly we do offer to you on your requirements and budget.
                    </p>
                    <p>
                        We have multiple organic certificates for organic cultivation, organic processing and handling of organic productions. We implement the fine trace management in producing.
                    </p>
                    <p className="font-medium text-primary">
                        We are flexible to accept orders even for small quantity of the products depends upon country and availability. Please contact us if you are refused by other companies because of quantity or complicity of your order.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;

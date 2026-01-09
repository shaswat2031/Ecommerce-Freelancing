import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle, FileCheck, Shield, Globe } from 'lucide-react';
import BgImage1 from '../assets/bgimage1.png';
import BgImage2 from '../assets/bgimage2.png';
import CertImage from '../assets/image.png';

const Certification = () => {
    return (
        <div className="w-full pt-20">
            {/* Header / Breadcrumb Section */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={BgImage1} alt="Organic Farming" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                </div>
                <div className="relative z-10 text-center space-y-4 animate-fade-in-up">
                    <h1 className="font-heading text-4xl md:text-5xl text-surface font-bold tracking-wide">CERTIFICATION</h1>
                    <div className="flex items-center justify-center space-x-2 text-sm md:text-base text-surface/80 font-light">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-accent">Certification</span>
                    </div>
                </div>
            </div>

            {/* Certified Organic Products */}
            <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto border-b border-secondary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl bg-white flex items-center justify-center">
                            <img src={CertImage} alt="Certified Organic" className="w-full h-full object-contain p-4" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-accent p-6 shadow-lg hidden md:block rounded-sm">
                            <Award size={48} className="text-primary" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <span className="text-accent text-sm tracking-[0.2em] uppercase font-bold">Standard of Excellence</span>
                        <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">Certified Organic Products</h2>
                        <div className="space-y-4 text-text-secondary font-light leading-relaxed text-lg">
                            <p>
                                We offer you an innovative range of quality products, which constantly set new standards in the organic food at marketplace. We ensure 100% traceability, from farm inspections, raw material supplies, right through to the finished product.
                            </p>
                            <p>
                                We can guarantee the supply of consistently high-quality foods, ethically produced with respect for the environment, for you to feel healthy. Before introducing in the market or our customer we get it double checked and get inspected by some certified Agencies based on US, European Standard and APEDA, Ministry of Agriculture.
                            </p>
                            <p className="font-medium text-primary">
                                Raw materials are carefully checked by quality assurance analysts making sure they are within specifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Certification Details */}
            <section className="bg-background py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <Shield size={40} className="text-accent mx-auto mb-4" strokeWidth={1} />
                        <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">OUR CERTIFICATION</h2>
                        <p className="text-text-secondary text-lg font-light leading-relaxed">
                            We provide as per India Organic (NPOP), USDA (NOP), Kosher and EU Standards. We adhere to stringent norms set by APEDA, Ministry of Agriculture with respect to transaction certificates used in traceability of the organic crops. But we do not stop there, we are proud to have maintained our best standard as well.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        {/* Card 1: B2B */}
                        <div className="bg-surface p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-accent">
                            <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary">
                                <Globe size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3 text-primary">Global B2B Solutions</h3>
                            <p className="text-text-secondary font-light text-sm leading-relaxed">
                                We are having B2B business scenario and accordingly we do offer to you on your requirements and budget. We are flexible to accept orders even for small quantity of the products depends upon country and availability.
                            </p>
                        </div>

                        {/* Card 2: Multiple Certificates */}
                        <div className="bg-surface p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary">
                            <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary">
                                <FileCheck size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3 text-primary">Multiple Certifications</h3>
                            <p className="text-text-secondary font-light text-sm leading-relaxed">
                                We have multiple organic certificates for organic cultivation, organic processing and handling of organic productions. We adhere to rigorous international standards.
                            </p>
                        </div>

                        {/* Card 3: Traceability */}
                        <div className="bg-surface p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-secondary">
                            <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3 text-primary">Fine Trace Management</h3>
                            <p className="text-text-secondary font-light text-sm leading-relaxed">
                                We implement the fine trace management in producing. Please contact us if you are refused by other companies because of quantity or complicity of your order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Certification;

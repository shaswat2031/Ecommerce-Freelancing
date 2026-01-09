import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Globe, Truck, Package, FileText, Send } from 'lucide-react';
import BgImage1 from '../assets/bgimage1.png';

import client from '../api/client';

const B2B = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        productInterest: [], // Changed to array for multiple selections
        quantity: '',
        destination: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        const { value, checked } = e.target;
        const { productInterest } = formData;

        if (checked) {
            setFormData({ ...formData, productInterest: [...productInterest, value] });
        } else {
            setFormData({ ...formData, productInterest: productInterest.filter(p => p !== value) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.post('/inquiries', formData);
            alert('Thank you for your inquiry. Our team will contact you shortly.');
            setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                productInterest: [],
                quantity: '',
                destination: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission failed', error);
            alert('Failed to submit inquiry. Please try again.');
        }
    };

    return (
        <div className="w-full pt-20">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={BgImage1} alt="Global Trade" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                </div>
                <div className="relative z-10 text-center space-y-4 animate-fade-in-up">
                    <h1 className="font-heading text-4xl md:text-5xl text-surface font-bold tracking-wide">B2B & IMPORT/EXPORT</h1>
                    <div className="flex items-center justify-center space-x-2 text-sm md:text-base text-surface/80 font-light">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-accent">B2B & Export</span>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto text-center space-y-8">
                <div className="max-w-4xl mx-auto">
                    <span className="text-accent text-sm tracking-[0.2em] uppercase font-bold">Global Reach</span>
                    <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-4 mb-6">Connecting Markets Worldwide</h2>
                    <p className="text-text-secondary text-lg font-light leading-relaxed">
                        Siraba Organic specializes in the global trade of premium organic spices. Whether you are a retailer, distributor, or manufacturer, we provide tailored B2B solutions to meet your specific needs. Our robust import/export infrastructure ensures seamless delivery across borders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
                    <div className="p-8 border border-secondary/10 rounded-sm hover:shadow-lg transition-shadow duration-300">
                        <Container size={32} className="text-accent mb-4" />
                        <h3 className="font-heading text-xl font-bold text-primary mb-3">Bulk Orders</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Competitive pricing for large-volume orders. We accommodate various packaging requirements, from bulk sacks to retail-ready packaging.
                        </p>
                    </div>
                    <div className="p-8 border border-secondary/10 rounded-sm hover:shadow-lg transition-shadow duration-300">
                        <Globe size={32} className="text-accent mb-4" />
                        <h3 className="font-heading text-xl font-bold text-primary mb-3">Global Logistics</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Expert handling of international shipping, customs documentation, and compliance with local import regulations in US, EU, and Asia.
                        </p>
                    </div>
                    <div className="p-8 border border-secondary/10 rounded-sm hover:shadow-lg transition-shadow duration-300">
                        <FileText size={32} className="text-accent mb-4" />
                        <h3 className="font-heading text-xl font-bold text-primary mb-3">Private Labeling</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Custom branding solutions ("White Label") available. Let us handle the production and quality while you focus on your brand.
                        </p>
                    </div>
                </div>
            </section>

            {/* Order Selection / Inquiry Form */}
            <section className="bg-background py-20 px-4">
                <div className="max-w-4xl mx-auto bg-surface shadow-xl rounded-sm p-8 md:p-12">
                    <div className="text-center mb-10">
                        <Package size={40} className="text-primary mx-auto mb-4" strokeWidth={1} />
                        <h2 className="font-heading text-3xl text-primary font-bold">Trade Inquiry & Order Selection</h2>
                        <p className="text-text-secondary mt-2 font-light">
                            Tell us about your requirements, and we will provide a custom quote within 24 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="e.g. Organic Foods Ltd"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Contact Person</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    required
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Your Full Name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="name@company.com"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Updated Product Interest to Checkboxes */}
                        <div className="space-y-3">
                            <label className="text-xs uppercase tracking-wider text-primary font-medium block">Product Interest (Select all that apply)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {['Kashmiri Saffron (Mongra)', 'Heeng (Asafoetida)', 'Organic Walnuts', 'Other'].map((item) => (
                                    <label key={item} className={`flex items-center space-x-3 p-3 border rounded-sm cursor-pointer transition-colors ${formData.productInterest.includes(item) ? 'bg-secondary/10 border-accent' : 'border-secondary/20 hover:bg-secondary/5'}`}>
                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={formData.productInterest.includes(item)}
                                            onChange={handleProductChange}
                                            className="accent-accent h-4 w-4"
                                        />
                                        <span className="text-sm text-text-primary font-light">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Estimated Quantity</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="e.g. 5kg, 100 units"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-primary font-medium">Destination Country</label>
                                <input
                                    type="text"
                                    name="destination"
                                    required
                                    className="w-full border-b border-secondary/20 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="e.g. United States, Germany, UAE"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-primary font-medium">Additional Requirements</label>
                            <textarea
                                name="message"
                                rows="4"
                                className="w-full border border-secondary/20 bg-transparent p-3 focus:outline-none focus:border-accent transition-colors rounded-sm text-sm"
                                placeholder="Please describe any specific packaging needs, certification requirements, or other questions..."
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-surface font-medium text-sm tracking-widest uppercase py-4 hover:bg-accent hover:text-primary transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                        >
                            Request Quote <Send size={18} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default B2B;

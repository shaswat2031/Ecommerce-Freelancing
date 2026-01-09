import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Certification from './pages/Certification';
import B2B from './pages/B2B';
import Account from './pages/Account';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import TrackOrder from './pages/TrackOrder';

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <OrderProvider>
                    <CartProvider>
                        <Router>
                            <div className="flex flex-col min-h-screen font-body text-text-primary bg-background selection:bg-accent selection:text-primary">
                                <Navbar />
                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/product/:slug" element={<ProductDetails />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/about-us" element={<About />} />
                                        <Route path="/certification" element={<Certification />} />
                                        <Route path="/b2b" element={<B2B />} />
                                        <Route path="/contact-us" element={<Contact />} />
                                        <Route path="/account" element={<Account />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/track-order" element={<TrackOrder />} /> {/* Added route */}

                                        {/* Admin Routes */}
                                        <Route path="/admin" element={<AdminLogin />} />
                                        <Route path="/admin/dashboard" element={<AdminDashboard />} />

                                        {/* Placeholder Routes - To be implemented */}
                                        <Route path="/saffron" element={<div className="pt-32 text-center h-screen flex items-center justify-center text-xl font-heading text-primary">Saffron Details (Coming Soon)</div>} />
                                        <Route path="/traceability" element={<div className="pt-32 text-center h-screen flex items-center justify-center text-xl font-heading text-primary">Traceability (Coming Soon)</div>} />
                                        <Route path="/journal" element={<div className="pt-32 text-center h-screen flex items-center justify-center text-xl font-heading text-primary">Journal (Coming Soon)</div>} />

                                        {/* 404 Route */}
                                        <Route path="*" element={<div className="pt-32 text-center h-screen flex items-center justify-center text-xl font-heading text-primary">404 - Page Not Found</div>} />
                                    </Routes>
                                </main>
                                <Footer />
                            </div>
                        </Router>
                    </CartProvider>
                </OrderProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;

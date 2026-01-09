import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';
import { products as initialProducts } from '../data/products'; // Keep for fast seeding if needed

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // Keep internal state for home content for now, or move to DB later
    const [homeContent, setHomeContent] = useState(() => {
        const savedContent = localStorage.getItem('homeContent');
        return savedContent ? JSON.parse(savedContent) : {
            subheading: "Curated Excellence",
            heading: "Signature Collection"
        };
    });

    const fetchProducts = async () => {
        try {
            const { data } = await client.get('/products');
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const { data } = await client.post('/products', newProduct);
            setProducts(prev => [...prev, data]);
        } catch (error) {
            console.error("Failed to add product", error);
            alert("Failed to add product. Ensure backend is running and you are Admin.");
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const { data } = await client.put(`/products/${updatedProduct._id || updatedProduct.id}`, updatedProduct);
            setProducts(prev => prev.map(p => (p._id === data._id ? data : p)));
        } catch (error) {
            console.error("Failed to update product", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await client.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const updateHomeContent = (newContent) => {
        setHomeContent(prev => ({ ...prev, ...newContent }));
        localStorage.setItem('homeContent', JSON.stringify({ ...homeContent, ...newContent }));
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            homeContent,
            updateHomeContent
        }}>
            {children}
        </ProductContext.Provider>
    );
};

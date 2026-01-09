import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const { user, isAdmin } = useAuth();
    const [orders, setOrders] = useState([]);
    const [activeUsers, setActiveUsers] = useState(1); // Real implementation uses sockets, this is mock

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const url = isAdmin ? '/orders' : '/orders/myorders';
                const { data } = await client.get(url);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, [user, isAdmin]);

    const createOrder = async (orderData) => {
        try {
            const { data } = await client.post('/orders', orderData);
            setOrders(prev => [...prev, data]);
            return data;
        } catch (error) {
            console.error("Failed to create order", error);
            throw error;
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { data } = await client.put(`/orders/${orderId}/status`, { status });
            setOrders(prev => prev.map(order =>
                order._id === orderId ? data : order
            ));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, activeUsers }}>
            {children}
        </OrderContext.Provider>
    );
};

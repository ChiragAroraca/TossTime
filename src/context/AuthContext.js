// Enhanced AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuthStatus = async () => {
        const startTime = Date.now();
        const minSplashDuration = 2000; // 2 seconds minimum

        try {
            const token = await AsyncStorage.getItem('token');
            const userData = await AsyncStorage.getItem('user');

            if (token) {
                // Optional: Add token validation here
                // const isValid = await validateTokenWithServer(token);
                setIsAuthenticated(true);
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAuthenticated(false);
            setUser(null);
        }

        // Ensure minimum splash duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minSplashDuration - elapsedTime;
        if (remainingTime > 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        } else {
            setIsLoading(false);
        }
    };

    const login = async (token, userData) => {
        console.log(token)
        try {
            await AsyncStorage.setItem('token', token);
            if (userData) {
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            }
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.multiRemove(['token', 'user']);
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value = {
        isLoading,
        isAuthenticated,
        user,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
import React from 'react';
import logo from '../assets/images/RSMarketplace.png';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-teal-700 to-indigo-900 text-white py-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 mx-auto">
                    <img src={logo} alt="RS Marketplace" className="w-96 mb-5" />
                    <div className="chat chat-start">
                        <div className="chat-bubble">I want to find my dream home.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble">Welcome to RealEstate Marketplace!</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm">
                <p>&copy; 2024 RS Marketplace. All rights reserved.</p>
            </div>
            <div className="mt-8 flex justify-center">
                <p className="text-xs opacity-50">Made with ❤️ by Armir Pepkola</p>
            </div>
        </footer>
    );
}
